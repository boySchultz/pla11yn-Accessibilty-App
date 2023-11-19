import { SettingsKey } from "../feats/settings/settingsConfig";

export type SettingsState = {
  settingsKey: SettingsKey;
  activeStep: number;
  initialValue: number | string;
};

export type AllyStore = {
  /**
   * Ally Setting state entries stored
   */
  settings: SettingsState[];

  /**
   * Getter function for all Settings entries. Use to avoid accessing the data directly.
   * @returns All stored entries, in the store internal format `StoredEntry`, which includes metadata.
   */
  getAllSettings: () => SettingsState[];
  /**
   * Retrieve setting by identifier.
   * @param search specific ally setting.
   * @returns ally setting specified.
   */
  getSettingByKey: (
    searchSetting: Partial<SettingsState>
  ) => SettingsState | undefined;

  /**
   * Write setting by identifier.
   * @param setting specific ally setting.
   */
  writeSetting: (setting: Partial<SettingsState>) => void;
  /**
   * Remove a single setting from the store.
   * @param setting Object to remove from store. This parameter is of the same type as the entries, but partial. Providing the identifying properties is enough.
   */
  removeSettingByKey: (setting: Partial<SettingsState>) => void;
  /**
   * Remove all settings from the store.
   */
  removeAllSettings: () => void;
};
