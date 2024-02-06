import { useGetAuthorityInfo } from "@/api/authorities";
import { NotFound } from "@/components/Democracy";
import {
  CreateRequestFormHeader,
  MakeRequestInstruction,
  MakeRequestPageFooter,
  RequestMultiStepForm,
} from "@/components/Dialogue";
import { PageLoader } from "@/components/custom";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";

interface CreateRequestPageProp {}
const CreateRequestPage: React.FC<CreateRequestPageProp> = () => {
  const { authorityId } = useParams();
  const {
    data: authority,
    isLoading: isLoadingAuthority,
    isError,
  } = useGetAuthorityInfo(authorityId!);

  return (
    <>
      {/* LOADING */}
      {isLoadingAuthority && <PageLoader />}

      {/* ERROR */}
      {isError && !authority && <NotFound message="Debate not found" />}

      {authority && !isLoadingAuthority && (
        <div>
          <CreateRequestFormHeader authority={authority.information} />
          <Separator className="h-[2px] my-9" />
          {/* FORM */}
          <div className="flex justify-start items-start gap-14 flex-col xl:flex-row">
            <RequestMultiStepForm authority={authority.information} />
            <MakeRequestInstruction />
          </div>

          <div className=" flex justify-between flex-col gap-10 my-16 md:flex-row">
            <MakeRequestPageFooter />
            <div className=" rounded-2xl p-4 bg-primary/10 w-full max-w-[400px] h-fit space-y-3">
              <h3 className="text-dark text-xl lg:text-2xl">
                Signing your request{" "}
              </h3>
              <p className="text-dark text-base flex-1">
                Everything that you enter on this page, including your name,
                will be displayed publicly on this website forever.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateRequestPage;
