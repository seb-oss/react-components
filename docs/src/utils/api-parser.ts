import { Declaration, TypescriptParser, ClassDeclaration, PropertyDeclaration, VariableDeclaration, InterfaceDeclaration, TypeAliasDeclaration, File as ParsedFile } from "browser-typescript-parser";

export interface ParsedPropertyDeclartion {
    isDefault: boolean;
    name: string;
    properties: Array<ExtendedPropertyDeclaration>;
    extendedFrom: Array<ExtendedPropertyDeclaration>;
}

export interface ExtendedPropertyDeclaration extends Omit<PropertyDeclaration, "type"> {
    description: string;
    isExtended?: boolean;
    type: string | Array<string>;
}

interface MappedInterface {
    [key: string]: Array<APIInput>;
}

interface ParsedTypeInterface {
    interfaces: Array<ParsedPropertyDeclartion>;
    importedInterfaces: Array<APIInput>;
}

interface RegexMapper<T = any> {
    name: keyof T;
    index: string;
}

export class APIExtractService {
    constructor() {}
    tsParser: TypescriptParser = new TypescriptParser();
    $content: Promise<any>;

    /**
     * extract input/output/properties to object
     * @param sourceCode string of source code
     * @param regex regular expression
     * @param mapper map regex array to object attribute
     * @returns parsed object
     */
    static formatSourceCode(sourceCode: string, regex: RegExp, mapper: Array<RegexMapper>): any {
        let parsedObject: any = {};
        let parsedArray: Array<any> = [];
        while ((parsedArray = regex.exec(sourceCode))) {
            const inputs: APIInput = {};
            Object.keys(parsedArray)
                .filter((key: string) => {
                    return mapper.findIndex(({ index }: RegexMapper) => index === key) > -1;
                })
                .map((key: string) => {
                    const name: string = mapper.find(({ index }: RegexMapper) => index === key)?.name as string;
                    inputs[name] = parsedArray[key];
                });
            if (!!inputs.name) {
                parsedObject = { ...parsedObject, [inputs.name]: inputs };
            }
        }
        return parsedObject;
    }

    /**
     * extract input with comment from source code
     * @param sourceCode string of source code
     * @returns parsed API
     */
    static extractInputs(sourceCode: string): ParsedAPI {
        const regex: RegExp = new RegExp(`(\\/\\*\\*([\\s\\S]<!-- skip -->[\\s\\S])?(\\s*\\n)?([^\\*]|(\\*(?!\\/)))*\\*\\/)?(?:[\\r\\n\\t\\s]*)(.+?(?=(\\?)?:))(?:(?:\\?)?(?::\\s))(.+?(?=;))`, "g");
        const mappers: Array<RegexMapper> = [
            { name: "comment", index: "1" },
            { name: "skip", index: "2" },
            { name: "name", index: "6" },
            { name: "optional", index: "7" },
            { name: "type", index: "8" },
        ];
        return this.formatSourceCode(sourceCode, regex, mappers);
    }

    /**
     * extract component description from source code
     * @param sourceCode string of source code
     * @return parsed property
     */
    static extractDescription(sourceCode: string): APIInput {
        const regex: RegExp = new RegExp(
            `((\\/\\*\\*(\\s*\\n)?([^\\*]|(\\*(?!\\/)))*\\*\\/)?[^;}\\w]+|)(?:export\\s)?(?:(const|class)\\s)?(.*(?=:|extends))(?:(?::|extends)?\\s|$)(?:React.(?:Component|FC|FunctionComponent))`,
            "g"
        );
        const parsedArray: Array<any> = regex.exec(sourceCode);
        return parsedArray ? { comment: parsedArray[1], name: parsedArray[7] } : {};
    }

    /**
     * parse comment
     * @param comment string of comment
     * @returns formmatted comment
     */
    static parseComment(comment: string): string {
        return this.formatComment(comment?.length ? comment.replace(/\*\/+|\/\*+|\*\s+|[\t\r\n]/g, "") : "");
    }

    /**
     * format comment with backticks
     * @param comment string of comment
     * @returns formatted comment
     */
    static formatComment(comment: string): string {
        const regexPattern: string = "\\`(.*?)\\`";
        const rawCodeReg: RegExp = new RegExp(regexPattern, "g");
        let newComment: string = comment;
        while (newComment.match(rawCodeReg)) {
            const arr: RegExpExecArray = rawCodeReg.exec(newComment);
            newComment = newComment.replace(new RegExp(regexPattern), `<code>${arr[1]}</code>`);
        }
        return newComment.trim();
    }

    /**
     * extract interfaces from source code
     * @param sourceCode string of source code
     * @param interfaceDeclaration interfaces parsed by file parser
     * @returns list of interfaces
     */
    extractInterfaces(sourceCode: string, interfaceDeclaration: InterfaceDeclaration): Array<ExtendedPropertyDeclaration> {
        const extensionRegex: RegExp = new RegExp("extends([^{]*){", "g");
        const extensions: Array<string> = extensionRegex.exec(sourceCode);
        let newExtensionsArray: Array<ExtendedPropertyDeclaration> = [];
        if (extensions && extensions[1]) {
            newExtensionsArray = extensions[1].split(",").map((item: string) => {
                const extendedType: string = item.trim();
                return { name: extendedType, type: extendedType, isExtended: true } as ExtendedPropertyDeclaration;
            });
        }
        const extractedProperties: ParsedAPI = APIExtractService.extractInputs(sourceCode);
        const parsedProperties: Array<ExtendedPropertyDeclaration> = interfaceDeclaration.properties
            .filter((item: PropertyDeclaration) => extractedProperties[item.name] && !extractedProperties[item.name]?.skip)
            .map((item: PropertyDeclaration) => {
                return {
                    ...item,
                    description: APIExtractService.parseComment(extractedProperties[item.name].comment),
                };
            });
        return [...newExtensionsArray, ...parsedProperties];
    }

    /**
     * extract type from source code
     * @param sourceCode string of source code
     * @returns list of types
     */
    extractType(sourceCode: string): Array<ExtendedPropertyDeclaration> {
        const typeSourceCode: string = sourceCode.substr(sourceCode.indexOf("=") + 1).trim();
        const typeArray: Array<string> = typeSourceCode.split("&");
        const curlyBracesRegex: RegExp = new RegExp("{([^}]*)}", "g");
        const defaultTypeKey: string = "_default";
        const newProperties: Array<ExtendedPropertyDeclaration> = typeArray.reduce((previousValue: Array<ExtendedPropertyDeclaration>, innerType: string) => {
            if (curlyBracesRegex.test(innerType)) {
                return [...previousValue, ...this.parseInputs(APIExtractService.extractInputs(innerType))];
            } else if (innerType.indexOf("|") > -1) {
                const defaultType: ExtendedPropertyDeclaration = previousValue.find(({ name }: ExtendedPropertyDeclaration) => name === defaultTypeKey);
                return [
                    ...previousValue,
                    {
                        name: defaultTypeKey,
                        type: (defaultType?.type || "") + innerType,
                    } as ExtendedPropertyDeclaration,
                ];
            } else {
                return [...previousValue, { name: innerType, type: innerType, isExtended: true } as ExtendedPropertyDeclaration];
            }
        }, []);

        return newProperties;
    }

    initParse(sourceFileUrl: any, importedTypeFileUrls?: Array<any>): Promise<Array<ApiSection>> {
        return this.parseSourceFile(sourceFileUrl, importedTypeFileUrls || []);
    }

    /**
     * parse source file
     * @param source string of source code
     * @param importedTypeFileUrls array of imported types file source
     * @returns promise of list of API section
     */
    parseSourceFile(source: string, importedTypeFileUrls: Array<any>): Promise<Array<ApiSection>> {
        const description: APIInput = APIExtractService.extractDescription(source);
        return this.tsParser.parseSource(source).then(async (res: ParsedFile) => {
            const importedInterfaces = await this.extractImportedTypesInterfaces(importedTypeFileUrls);
            return this.parse(res, source, importedInterfaces, description);
        });
    }

    /**
     * parse source code file to api
     * @param file parsed file
     * @param description extracted description
     * @param sourceCode source code
     * @param importedTypes array of imported types file source
     * @return array of API section
     */
    parse(file: ParsedFile, sourceCode: string, importedTypes: Array<any>, description: APIInput): Array<ApiSection> {
        const parsedType = this.extractTypesInterfaces(file, sourceCode);
        const defaultFunctionPropTypeRegex: RegExp = new RegExp("<([^}]*)>", "g");
        return file.declarations
            .filter(
                (declaration: VariableDeclaration | ClassDeclaration) =>
                    (declaration instanceof VariableDeclaration && declaration.type && (declaration.type.indexOf("FC") > -1 || declaration.type.indexOf("FunctionComponent") > -1)) ||
                    declaration instanceof ClassDeclaration
            )
            .reduce((previous: Array<ApiSection>, current: VariableDeclaration | ClassDeclaration) => {
                const declaration: VariableDeclaration | ClassDeclaration = current;
                let defaultPropType: string;
                if (declaration instanceof VariableDeclaration) {
                    const propTypeArray: Array<string> = defaultFunctionPropTypeRegex.exec(declaration.type);
                    // get default props type from function component
                    if (propTypeArray?.length) {
                        defaultPropType = propTypeArray[1];
                    }
                } else {
                    // get default props type from class component
                    defaultPropType = declaration.ctor.parameters[0].type;
                }
                const parsedInterfaces: ParsedTypeInterface = this.parseTypesInterfaces(parsedType, defaultPropType);
                const parsedImportedInterfaces: Array<ParsedTypeInterface> = importedTypes.reduce((importedTypeArray: Array<ParsedTypeInterface>, item: Array<ParsedPropertyDeclartion>) => {
                    return [...importedTypeArray, ...item.map((importedArray: ParsedPropertyDeclartion) => ({ ...importedArray, isDefault: importedArray.name === defaultPropType }))];
                }, []);
                const section: ApiSection = {
                    description: description ? APIExtractService.parseComment(description.comment?.trim()) : "",
                    name: declaration.name,
                    interfaces: [...parsedInterfaces.interfaces, ...parsedImportedInterfaces],
                };
                return [...previous, section];
            }, []);
    }

    /**
     * extract imported types and interfaces from source code
     * @param imported list of imported source code
     * @return list of list of parsed types/ interfaces
     */
    async extractImportedTypesInterfaces(imports: Array<any>): Promise<Array<Array<ParsedPropertyDeclartion>>> {
        const test = imports.map((item: any) => {
            const rawSource: string = item;
            return this.tsParser.parseSource(rawSource).then((parsedFile: ParsedFile) => {
                return this.parseTypesInterfaces(this.extractTypesInterfaces(parsedFile, rawSource), "").interfaces;
            });
        });
        return await Promise.all(test);
    }

    /**
     * extract types and interfaces from source code
     * @param file parsed file
     * @param sourceCode source of code
     * @returns mapped interfaces/ types
     */
    extractTypesInterfaces(file: ParsedFile, sourceCode: string): MappedInterface {
        const parsedType = {};
        file.declarations.map((declaration: Declaration) => {
            if (declaration instanceof InterfaceDeclaration) {
                const newSrc: string = sourceCode.substring(declaration.start, declaration.end);
                parsedType[declaration.name] = this.extractInterfaces(newSrc, declaration);
            } else if (declaration instanceof TypeAliasDeclaration) {
                const newSrc: string = sourceCode.substring(declaration.start, declaration.end);
                parsedType[declaration.name] = this.extractType(newSrc);
            }
        });
        return parsedType;
    }

    /**
     * parse interfaces and types to imported interfaces or default interfaces
     * @param interfaces object of mapped interfaces
     * @param defaultProp name of default type/ interfaces used by component
     * @returns parsed interface/ type
     */
    parseTypesInterfaces(interfaces: MappedInterface, defaultProp: string): ParsedTypeInterface {
        let extendedTypes: Array<APIInput> = [];
        const newInterfaces: Array<ParsedPropertyDeclartion> = Object.keys(interfaces).reduce((prev: Array<any>, current: string) => {
            const attr: Array<APIInput> = interfaces[current];
            const extendedFrom: Array<APIInput> = attr.filter(({ isExtended }: APIInput) => isExtended);
            extendedTypes = [...extendedTypes, ...extendedFrom];
            return [
                ...prev,
                {
                    isDefault: current === defaultProp,
                    properties: attr.filter(({ isExtended }: APIInput) => !isExtended),
                    name: current,
                    extendedFrom,
                },
            ];
        }, []);
        return {
            interfaces: newInterfaces,
            importedInterfaces: extendedTypes,
        };
    }

    /**
     * parse inputs
     * @param interfaces extracted api
     * @returns array of extended properties
     */
    parseInputs(interfaces: ParsedAPI): Array<ExtendedPropertyDeclaration> {
        return Object.keys(interfaces)
            .filter((item: string) => !interfaces[item].skip?.length)
            .sort((a: string, b: string) => a.localeCompare(b))
            .reduce((prev: Array<ExtendedPropertyDeclaration>, current: string) => {
                const attr: APIInput = interfaces[current];
                return [
                    ...prev,
                    {
                        visibility: 1,
                        isStatic: false,
                        type: attr.type as string,
                        name: attr.name,
                        isOptional: !attr.optional,
                        description: APIExtractService.parseComment(interfaces[current]?.comment?.trim()),
                    },
                ];
            }, []);
    }
}
