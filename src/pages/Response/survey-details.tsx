import { useGetSurveyInfo } from "@/api/survey";
import { SurveyDetails } from "@/components/Response";
import { FloatingLoader } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import { useParams } from "react-router-dom";

export default function SurveyDetailsPage() {
  const { surveyId } = useParams();

  const { data, isLoading } = useGetSurveyInfo(surveyId!);

  const { logout, isLoggedIn } = useAuthContext();

  return (
    <div className="relative min-h-screen px-4 pt-4 pb-12 md:pt-0 md:px-12 space-y-7">
      {!isLoggedIn && (
        <div className="fixed z-50 w-full p-3 bg-white shadow-md md:p-4 max-w-64 right-10 top-16 md:top-20 rounded-xl ">
          <p className="text-sm">
            Signin to comment on this response and perform other interactions
          </p>
          <div className="flex justify-end mt-2">
            <Button onClick={logout} size="sm">
              Signin
            </Button>
          </div>
        </div>
      )}
      {isLoading && <FloatingLoader />}
      {data && (
        <>
          <h3 className="text-2xl">View Survey</h3>

          <SurveyDetails survey={data} />
        </>
      )}
    </div>
  );
}
