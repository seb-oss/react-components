import { isEmpty } from "@sebgroup/frontend-tools/isEmpty";
import pupa from "pupa";
import React from "react";

export type TranslationValues = string | Array<Translation>;

export interface Translation {
    [key: string]: TranslationValues;
}

export interface TranslationContextInterface {
    /**
     * A boolean flag to indicate the translation fetching is in progress.
     */
    isLoading: boolean;
    /**
     * The translation helper method that returns the translation text
     * corresponding to the translation key provided.
     *
     * @param {string} key - The translation text key
     * @param {object} [data] - The data to be interpolated
     * @returns {(string|Array)} the translation values correspond to the key provided
     */
    t: (key: string, data?: { [key: string]: any }) => TranslationValues;
}

export interface TranslationProviderProps {
    /**
     * The translation source URL.
     */
    url: string;
    /**
     * The fallback translation if translation fetching fails. This is useful
     * when either network fail or the translation source is unreachable.
     */
    fallbackTranslation?: Translation;
    /**
     * The response path to the translation, defaulted to `result.content`.
     * This is to map the response into actual translation key mapping.
     */
    translationPath?: string;
}

const DEFAULT_TRANSLATION_PATH: string = "result.content";

const TranslationContext = React.createContext<TranslationContextInterface | undefined>(undefined);

const TranslationProvider: React.FC<React.PropsWithChildren<TranslationProviderProps>> = ({ children, fallbackTranslation, translationPath = DEFAULT_TRANSLATION_PATH, url }) => {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [translation, setTranslation] = React.useState<Translation>();

    React.useEffect(() => {
        async function fetchTranslation(): Promise<void> {
            try {
                const response = await (await fetch(url)).json();
                setTranslation(mapResponseToTranslation(response, translationPath));
            } catch (error) {
                console.warn(error);
                fallbackTranslation && setTranslation(fallbackTranslation);
            } finally {
                setLoading(false);
            }
        }

        fetchTranslation();
    }, [url]);

    const getTranslation = React.useCallback(
        (key: string, data: { [key: string]: any }) => {
            const value: TranslationValues = translation?.[key];

            if (typeof value === "string" && !isEmpty(data)) {
                return pupa(value, data);
            }

            return value;
        },
        [translation]
    );

    return (
        <TranslationContext.Provider
            value={{
                isLoading,
                t: getTranslation,
            }}
        >
            {children}
        </TranslationContext.Provider>
    );
};

function mapResponseToTranslation(response: any, translationPath: string): Translation {
    const path: Array<string> = translationPath.split(".");
    const length: number = path.length;
    let index: number = 0;
    let translation: unknown = { ...response };

    while (!!translation && index < length) {
        translation = translation[path[index++]];
    }

    return index && index === length ? (translation as Translation) : undefined;
}

function useTranslationContext() {
    const context: TranslationContextInterface = React.useContext(TranslationContext);

    if (context === undefined) {
        throw new Error("useTranslationContext must be used within a TranslationProvider");
    }

    return context;
}

export { TranslationProvider, useTranslationContext };
