export interface WordDefinition {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license?: License;
    sourceUrls: string[];
}

export interface NoDefinitionFound {
    title: "No definition found",
    message?: string;
    resolution?: string;
}

interface Phonetic {
    text: string;
    audio?: string;
    sourceUrl?: string;
    license?: License;
}

interface License {
    name: string;
    url: string;
}

interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms?: string[];
    antonyms?: string[];
}

interface Definition {
    definition: string;
    synonyms?: string[];
    antonyms?: string[];
}