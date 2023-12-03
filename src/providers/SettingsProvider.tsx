import { PropsWithChildren, createContext, useContext, useState } from "react";

const SettingsContext = createContext<SettingsContextType>({
  activeOption: "User Profile",
  setActiveOption: () => {},
  twoFactorAuth: false,
  setTwoFactorAuth: () => {},
});

export const useSettingsContext = () => useContext(SettingsContext);

export default function SettingsProvider({ children }: PropsWithChildren) {
  const [activeOption, setActiveOption] =
    useState<SettingsOption>("User Profile");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <SettingsContext.Provider
      value={{ activeOption, setActiveOption, twoFactorAuth, setTwoFactorAuth }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
