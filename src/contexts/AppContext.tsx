import { useGetUserProfile } from "@/api/auth";
import { useGetAllCategories } from "@/api/category";
import { useGetAllSDGs } from "@/api/democracy/debates";
import { useGetAllWards } from "@/api/locale";
import useDisclosure from "@/hooks/useDisclosure";
import config from "@/utils/config";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

interface AppContextType {
  fetchingSdgs: boolean;
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  fetchingUser: boolean;
  sdgData: SDGsType[];
  targets: SDGTarget[];
  setTargets: React.Dispatch<React.SetStateAction<SDGTarget[]>>;
  wards: WardsType[];
  fetchingWards: boolean;
  fetchingCategories: boolean;
  categories: CategoryType[];
  isLoginModalOpen: boolean;
  onLoginModalClose: () => void;
  onLoginModalOpen: () => void;
  handleOpenModal: () => void;
}

const AppContext = createContext<AppContextType>({
  fetchingSdgs: false,
  fetchingUser: false,
  user: null,
  setUser: () => {},
  sdgData: [],
  targets: [],
  setTargets: () => {},
  wards: [],
  fetchingWards: false,
  fetchingCategories: false,
  categories: [],
  isLoginModalOpen: false,
  onLoginModalClose: () => {},
  onLoginModalOpen: () => {},
  handleOpenModal: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: PropsWithChildren) {
  const location = useLocation();
  const {
    isOpen: isLoginModalOpen,
    onClose: onLoginModalClose,
    onOpen: onLoginModalOpen,
  } = useDisclosure();

  const handleOpenModal = () => {
    localStorage.setItem(config.key.redirect, location.pathname);
    console.log("called");
    return onLoginModalOpen();
  };

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
        isLoginModalOpen,
        onLoginModalClose,
        onLoginModalOpen,
        handleOpenModal,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
