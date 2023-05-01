export type SettingsState = {
	identifier: string;
	currentStep: number;
	initialValue: number;
};

export type AllyStore = {
	/**
	 * Ally Setting state entries stored
	 */
	settings: SettingsState[];
	/**
	 * Retrieve setting by identifier.
	 * @param searchsettting specific ally setting.
	 * @returns ally setting specified.
	 */
	getSetting: (searchSetting: Partial<SettingsState>) => SettingsState | undefined;

	/**
	 * Write setting by identifier.
	 * @param setting specific ally setting.
	 */
	writeSetting: (setting: Partial<SettingsState>) => void;
	/**
	 * Remove a single setting from the store.
	 * @param settting Object to remove from store. This parameter is of the same type as the entries, but partial. Providing the identifying properties is enough.
	 */
	removeSetting: (setting: Partial<SettingsState>) => void;
	/**
	 * Remove all settings from the store.
	 */
	removeAllSettings: () => void;
};
