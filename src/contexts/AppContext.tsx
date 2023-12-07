import { useGetAllSDGs } from "@/api/democracy/debates";
import { PropsWithChildren, createContext, useContext,  } from "react";

interface AppContextType {
  fetchingSdgs: boolean;
  sdgData: SDGType | null;
}

const AppContext = createContext<AppContextType>({
  fetchingSdgs: false,
  sdgData: null,
});

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: PropsWithChildren) {
  const { isLoading: fetchingSdgs, data: sdgData } = useGetAllSDGs();

  return (
    <AppContext.Provider value={{ sdgData, fetchingSdgs }}>
      {children}
    </AppContext.Provider>
  );
}
