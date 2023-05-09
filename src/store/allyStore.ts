import { create } from "zustand";
import { AllyStore, SettingsState } from "./StoreTypes";

//region utils
const getSetting = (store: AllyStore, settingsKey: string) =>
  store.settings.find((s) => s.settingsKey === settingsKey);

const removeAllSettingsFromState = () => {
  return { settings: [] };
};

const removeSetting = (store: AllyStore, settingsKey: string) => {
  return {
    settings: store.settings.filter((s) => s.settingsKey !== settingsKey),
  };
};

const updateSetting = (store: AllyStore, update: SettingsState) => {
  console.log("update");
  return {
    settings: store.settings.map((currentSetting) => {
      if (currentSetting.settingsKey !== update.settingsKey)
        return currentSetting;
      return { ...currentSetting, ...update };
    }),
  };
};

const addSetting = (store: AllyStore, update: SettingsState) => {
  console.log("add");
  return {
    settings: [...store.settings, update],
  };
};
const updateOrCreateSetting = (store: AllyStore, setting: SettingsState) => {
  console.log("store", store.settings);
  return !store.settings.find((s) => s.settingsKey === setting.settingsKey)
    ? addSetting(store, setting)
    : updateSetting(store, setting);
};
//endregion

export const useAllyStore = create<AllyStore>((set, get) => ({
  settings: [] as SettingsState[],

  getAllSettings: () => get().settings,
  getSettingByKey: (partialSetting) => {
    return partialSetting.settingsKey
      ? getSetting(get(), partialSetting.settingsKey)
      : undefined;
  },

  removeAllSettings: () => set(() => removeAllSettingsFromState()),
  removeSettingByKey: (partialSetting) => {
    set((state) =>
      partialSetting.settingsKey
        ? removeSetting(state, partialSetting.settingsKey)
        : state
    );
  },

  writeSetting: (setting) => {
    set((state) => updateOrCreateSetting(state, setting as SettingsState));
  },
}));
