import { create } from 'zustand'
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



//endregion
export const useStore = create<AllyStore>((set, get) => ( {
	settings: [] as SettingsState[],
	getAllSettings: () => get().settings,
	getSettingByKey: (partialSetting) => partialSetting.key ? getSetting(get(),partialSetting.key) : undefined,
	removeAllSettings: () => set(() => removeAllSettingsFromState()),
	removeSettingByKey:(partialSetting)=> set( (state)=> partialSetting.key ? removeSetting(state,partialSetting.key): state),
  writeSetting:()=>{},
} ))
