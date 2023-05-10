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

const updateSetting = (store: AllyStore, updateState: SettingsState) => {
  const updatedState = store.settings.map((currentState) => {
    if (currentState.settingsKey !== updateState.settingsKey)
      return currentState;
    return { ...currentState, ...updateState };
  });
  return {
    settings: updatedState
  };
};

const addSetting = (store: AllyStore, newState: SettingsState) => {
  return {
    settings: [...store.settings, newState],
  };
};
const updateOrCreateSetting = (store: AllyStore, setting: SettingsState) => {
  console.log('store', store.settings);
  console.log('update or create state', setting);
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
