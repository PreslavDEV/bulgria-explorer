import { createContext, PropsWithChildren } from "react";

import { Dictionary } from "@/configs/i18n.config";

export const DictContext = createContext({} as Dictionary);

interface DictionaryProviderProps extends PropsWithChildren {
  dict: Dictionary;
}

const DictionaryProvider = ({ dict, children }: DictionaryProviderProps) => {
  return <DictContext.Provider value={dict}>{children}</DictContext.Provider>;
};

export default DictionaryProvider;
