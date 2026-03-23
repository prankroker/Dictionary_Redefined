export type TriggerKey = 'none' | 'ctrl' | 'alt' | 'shift';

const STORAGE_KEY = 'dictionary-redefined-settings';

export interface Settings {
    triggerKey: TriggerKey;
}

const defaultSettings: Settings = {
    triggerKey: 'none',
};

export async function getSettings(): Promise<Settings> {
    try {
        const result = await browser.storage.local.get(STORAGE_KEY);
        const stored = result[STORAGE_KEY];
        return stored ? { ...defaultSettings, ...stored } : defaultSettings;
    } catch {
        return defaultSettings;
    }
}

export async function saveSettings(settings: Settings): Promise<void> {
    await browser.storage.local.set({ [STORAGE_KEY]: settings });
}