import { createContext } from "react";
import Threshold from "../enums/Threshold.enums";

type SettingContextProps = {
  settings: Record<Threshold, number> | null;
  setSettings: (settings: Record<Threshold, number> | null) => void;
};

const SettingContext = createContext<SettingContextProps>({
  settings: null,
  setSettings: () => {
    return;
  },
});

export default SettingContext;
