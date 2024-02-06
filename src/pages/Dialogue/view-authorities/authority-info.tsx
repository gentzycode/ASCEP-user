import { useGetAuthorityInfo } from "@/api/authorities";
import { PageLoader } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useAuthContext } from "@/providers/AuthProvider";
import ROUTES from "@/utils/routesNames";
import { Link, useNavigate, useParams } from "react-router-dom";

interface AuthorityInfoPageProp {}
const AuthorityInfoPage: React.FC<AuthorityInfoPageProp> = () => {
  const { authorityId } = useParams();
  const navigate = useNavigate();
  const { handleOpenModal } = useAppContext();
  const { isLoggedIn } = useAuthContext();
  const { data: authority, isLoading } = useGetAuthorityInfo(authorityId!);

  const handleMakeRequest = () => {
    if (isLoggedIn) {
      navigate(ROUTES.CREATE_REQUEST_ROUTE(authorityId!));
    } else {
      handleOpenModal();
    }
  };
  return (
    <div className="w-full max-w-[900px] space-y-9">
      {/* LOADING */}
      {isLoading && <PageLoader />}

      {authority && (
        <>
          <header className="flex justify-between flex-wrap items-start">
            <h3 className="text-royal_blue text-2xl md:text-4xl">
              {authority.information.name}
            </h3>

            <div className="flex flex-col gap-5">
              <p className="text-primary text-base md:text-lg">
                {authority.information.total_request_cache} requests
              </p>
              <Button className=" h-12" onClick={handleMakeRequest}>
                Make a request
              </Button>
            </div>
          </header>

          <p className="text-base md:text-lg text-text text-justify">
            {authority.information.description}
          </p>

          {/* CONTACT INFO */}
          <div className="w-full">
            <h2 className="pb-2 mb-4 pt-0 pl-0 border-b-4 text-lg text-text font-medium border-primary w-fit">
              Contact Information
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorityInfoPage;
