import { File as ParsedFile } from "typescript-parser-es5/resources/File";
import { Declaration, TypescriptParser, AccessorDeclaration, ClassDeclaration, PropertyDeclaration, MethodDeclaration, ParameterDeclaration, VariableDeclaration } from "typescript-parser-es5";

export interface ParsedAccessorDeclaration extends Partial<AccessorDeclaration> {
    isOptional?: boolean;
    description?: string;
}

interface RegexMapper {
    name: keyof APIInput;
    index: string;
}

export class APIExtractService {
    constructor() {}
    $content: Promise<any>;

    /**
     * extract input/output/properties to object
     * @param sourceCode string of source code
     * @param regex regular expression
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
                    const name: string = mapper.find(({ index }: RegexMapper) => index === key)?.name;
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
     * extract property with comment from source code
     * @param sourceCode string of source code
     */
    static extractProperties(sourceCode: string): ParsedAPI {
        const regex: RegExp = new RegExp(`(?:(Props).*){([^}]*)}`, "g");
        const extractedBlock: Array<any> = regex.exec(sourceCode);
        if (extractedBlock && extractedBlock[2]) {
            const input = APIExtractService.extractInputs(extractedBlock[2]);
            return input;
        }
        return {};
    }

    /**
     * extract component description from source code
     * @param sourceCode string of source code
     */
    static extractDescription(sourceCode: string): APIInput {
        const regex: RegExp = new RegExp(
            `((\\/\\*\\*(\\s*\\n)?([^\\*]|(\\*(?!\\/)))*\\*\\/)?[^\\w]+|)(?:export\\s)?(?:(const|class)\\s)?(.*(?=:|extends))(?:(?::|extends)?\\s|$)(?:React.(?:Component|FC|FunctionComponent))`,
            "g"
        );
        const parsedArray: Array<any> = regex.exec(sourceCode);
        return parsedArray ? { comment: parsedArray[1], name: parsedArray[7] } : {};
    }

    /**
     * parse comment
     * @param comment string of comment
     */
    static parseComment(comment: string): string {
        return this.formatComment(comment ? comment.replace(/\*\/+|\/\*+|\*\s+|[\t\r\n]/g, "") : "n/a");
    }

    /**
     * sort input
     * @param a AccessorDeclaration
     * @param b AccessorDeclaration
     */
    static sortInputs(a: AccessorDeclaration, b: AccessorDeclaration): number {
        const isSet: boolean = a.constructor.name === "SetterDeclaration";
        return isSet ? -1 : 0;
    }

    /** format comment with backticks */
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

    initParse(sourceFileUrl: any): Promise<Array<ApiSection>> {
        return this.parseSourceFile(sourceFileUrl?.default);
    }

    /**
     * parse source file
     * @param source string of source code
     */
    parseSourceFile(source: string): Promise<Array<ApiSection>> {
        const description: APIInput = APIExtractService.extractDescription(source);
        const inputs: ParsedAPI = APIExtractService.extractProperties(source);
        const tsParser: TypescriptParser = new TypescriptParser();
        return tsParser.parseSource(source).then((res: ParsedFile) => {
            return this.parse(res, description, inputs);
        });
    }

    /**
     * parse source code file to api
     * @param file parsed file
     * @param description extracted description
     * @param inputs extracted inputs
     * @param outputs extracted outputs
     * @param properties extracted properties
     * @param methods extracted methods
     */
    parse(file: ParsedFile, description: APIInput, inputs: ParsedAPI): Array<ApiSection> {
        return file.declarations
            .filter((declaration: VariableDeclaration) => {
                // only parse component or directive
                return declaration.type && (declaration.type.indexOf("FC") > -1 || declaration.type.indexOf("Component") > -1);
            })
            .reduce((previous: Array<ApiSection>, current: ClassDeclaration) => {
                const declaration: ClassDeclaration = current;
                const section: ApiSection = {
                    description: description ? APIExtractService.parseComment(description.comment) : "n/a",
                    name: declaration.name,
                    inputs: this.parseInputs(inputs),
                };
                const isEmpty: boolean = !this.getEntries(section)
                    // .filter((key: [string, any]) => {
                    //     console.log(key);
                    //     console.log("filter", Array.isArray(key[1]));
                    //     return Array.isArray(key[1]);
                    // })
                    .some((key: [string, any]) => {
                        return key[1].length > 0;
                    });
                return isEmpty ? [...previous] : [...previous, section];
            }, []);
    }

    /**
     * parse inputs
     * @param accessors array of AccessorDeclaration
     * @param inputs extracted api
     */
    parseInputs(inputs: ParsedAPI): Array<ParsedAccessorDeclaration> {
        return Object.keys(inputs)
            .filter((item: string) => !inputs[item].skip?.length)
            .sort((a: string, b: string) => a.localeCompare(b))
            .reduce((prev: Array<ParsedAccessorDeclaration>, current: string) => {
                const attr: APIInput = inputs[current];
                return [
                    ...prev,
                    {
                        type: attr.type,
                        name: attr.name,
                        isOptional: attr.optional.length > 0,
                        description: APIExtractService.parseComment(inputs[current]?.comment?.trim()),
                    },
                ];
            }, []);
    }

    /** get object entries */
    getEntries(obj: ApiSection): Array<any> {
        const ownProps: Array<string> = Object.keys(obj);
        let i: number = ownProps.length;
        const resArray: Array<any> = new Array(i); // preallocate the Array
        while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }
        return resArray;
    }
}
