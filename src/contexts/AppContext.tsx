import { useGetUserProfile } from "@/api/auth";
import { useGetAllCategories } from "@/api/category";
import { useGetAllSDGs } from "@/api/democracy/debates";
import { useGetAllWards } from "@/api/locale";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextType {
  fetchingSdgs: boolean;
  user: UserData | null;
  fetchingUser: boolean;
  sdgData: SDGsType[];
  targets: SDGTarget[];
  setTargets: React.Dispatch<React.SetStateAction<SDGTarget[]>>;
  wards: WardsType[];
  fetchingWards: boolean;
  fetchingCategories: boolean;
  categories: CategoryType[];
}

const AppContext = createContext<AppContextType>({
  fetchingSdgs: false,
  fetchingUser: false,
  user: null,
  sdgData: [],
  targets: [],
  setTargets: () => {},
  wards: [],
  fetchingWards: false,
  fetchingCategories: false,
  categories: [],
});

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: PropsWithChildren) {
  const { isLoading: fetchingSdgs, data: sdgData, isSuccess } = useGetAllSDGs();
  const { isLoading: fetchingWards, data: wards } = useGetAllWards();
  const { isLoading: fetchingCategories, data: categories } =
    useGetAllCategories();
  const [targets, setTargets] = useState<SDGTarget[]>([]);
  const [user, setUser] = useState<UserData | null>(null);

  const { data, isLoading: fetchingUser } = useGetUserProfile();
  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      const newTargets: SDGTarget[] = [];
      if (sdgData) {
        sdgData.forEach((sdg: SDGsType) => {
          newTargets.push(...sdg.sdgTarget);
        });
      }
      setTargets(newTargets);
    }
  }, [isSuccess, sdgData]);
  return (
    <AppContext.Provider
      value={{
        user,
        fetchingUser,
        sdgData: sdgData ?? [],
        fetchingSdgs,
        setTargets,
        targets,
        wards: wards ?? [],
        fetchingWards,
        categories: categories ?? [],
        fetchingCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
