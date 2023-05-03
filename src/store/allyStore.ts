import { create } from "zustand";
import { AllyStore, SettingsState } from "./StoreTypes";

//region utils
const getSetting = (store: AllyStore, settingsKey: string) =>
  store.settings.find((s) => s.key === settingsKey);

const removeAllSettingsFromState = () => {
  return { settings: [] };
};

const removeSetting = (store: AllyStore, settingsKey: string) => {
  return {
    settings: store.settings.filter((s) => s.key !== settingsKey),
  };
};

const updateSetting = (store: AllyStore, update: SettingsState) => {
  return {
    settings: store.settings.map((currentSetting) => {
      if (currentSetting.key !== update.key) return currentSetting;
      return { ...currentSetting, update };
    }),
  };
};

const addSetting = (store: AllyStore, update: SettingsState) => {
  return {
    settings: [...store.settings, update],
  };
};

const updateOrCreateEntry = (store: AllyStore, setting: SettingsState) => {
  return !store.settings.find((s) => s.key === setting.key)
    ? addSetting(store, setting)
    : updateSetting(store, setting);
};
//endregion

export const useStore = create<AllyStore>((set, get) => ({
  settings: [] as SettingsState[],

  getAllSettings: () => get().settings,
  getSettingByKey: (partialSetting) => {
    return partialSetting.key
      ? getSetting(get(), partialSetting.key)
      : undefined;
  },

  removeAllSettings: () => set(() => removeAllSettingsFromState()),
  removeSettingByKey: (partialSetting) => {
    set((state) =>
      partialSetting.key ? removeSetting(state, partialSetting.key) : state
    );
  },

  writeSetting: (setting) => {
    set((state) => updateOrCreateEntry(state, setting));
  },
}));
