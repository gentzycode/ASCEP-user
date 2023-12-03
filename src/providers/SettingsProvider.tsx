import { PropsWithChildren, createContext, useContext, useState } from "react";

const SettingsContext = createContext<SettingsContextType>({
  activeOption: "User Profile",
  setActiveOption: () => {},
});

export const useSettingsContext = () => useContext(SettingsContext);

export default function SettingsProvider({ children }: PropsWithChildren) {
  const [activeOption, setActiveOption] =
    useState<SettingsOption>("User Profile");

  return (
    <SettingsContext.Provider value={{ activeOption, setActiveOption }}>
      {children}
    </SettingsContext.Provider>
  );
}
