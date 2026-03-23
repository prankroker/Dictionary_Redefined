import {NoDefinitionFound, WordDefinition} from "@/types/dictionary.ts";

export interface PopupCoords {
    x: number;
    y: number;
}

export interface DefinitionsPopupProps {
    definitions: WordDefinition[] | NoDefinitionFound;
    coords: PopupCoords;
    onClose: () => void;
}