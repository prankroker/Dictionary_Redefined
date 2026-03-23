import {fetchWord} from "@/services/api/apiClient.ts";
import {WordDefinition, NoDefinitionFound} from "@/types/dictionary.ts";

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export async function getWordDefinition(word: string){
    const url = `${API_URL}${word}`;
    return fetchWord<WordDefinition[] | NoDefinitionFound>(url);
}