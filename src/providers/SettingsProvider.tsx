import { PropsWithChildren, createContext, useContext, useState } from "react";

const SettingsContext = createContext<SettingsContextType>({
  activeOption: "User Profile",
  setActiveOption: () => {},
  twoFactorAuth: false,
  setTwoFactorAuth: () => {},
  timeLimit: 0,
  setTimeLimit: () => {},
});

export const useSettingsContext = () => useContext(SettingsContext);

export default function SettingsProvider({ children }: PropsWithChildren) {
  const [activeOption, setActiveOption] =
    useState<SettingsOption>("User Profile");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const [timeLimit, setTimeLimit] = useState(0);

  return (
    <SettingsContext.Provider
      value={{
        activeOption,
        setActiveOption,
        twoFactorAuth,
        setTwoFactorAuth,
        timeLimit,
        setTimeLimit,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
