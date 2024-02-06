import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/providers/AuthProvider";
import { AddSquare, Flag, MinusSquare } from "iconsax-react";

interface CommentCardFooterProp {
  showResponse: boolean;
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfResponses: number;
  loading: boolean;
  isLoadingResponses: boolean;
  fetchResponse: () => void;
}
const CommentCardFooter: React.FC<CommentCardFooterProp> = ({
  showResponse,
  setShowResponse,
  numberOfResponses,
  setIsReplying,
  loading,
  isLoadingResponses,
  fetchResponse,
}) => {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="flex justify-start  gap-2 items-center flex-wrap">
      {showResponse ? (
        <Button
          className="bg-transparent hover:bg-transparent h-fit w-fit p-0  text-[14px]"
          onClick={() => {
            setShowResponse(false);
          }}
        >
          <MinusSquare size={25} />
          <span>{numberOfResponses} responses</span>
        </Button>
      ) : (
        <Button
          className="bg-transparent hover:bg-transparent h-fit w-fit p-0  text-[14px] disabled:opacity-100"
          onClick={fetchResponse}
          isLoading={loading}
          disabled={isLoadingResponses || numberOfResponses === 0}
        >
          <AddSquare size={25} />
          <span>{numberOfResponses} responses</span>
        </Button>
      )}

      {isLoggedIn && (
        <>
          <Separator
            orientation="vertical"
            className="h-5  text-dark bg-base-500"
          />
          <Button
            className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]"
            onClick={() => {
              setIsReplying(true);
              setShowResponse(false);
            }}
          >
            Reply
          </Button>
        </>
      )}

      <Separator
        orientation="vertical"
        className="h-5  text-dark bg-base-500"
      />

      <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
        <Flag size="25" />
      </Button>
      <Separator
        orientation="vertical"
        className="h-5  text-dark bg-base-500"
      />
      <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
        Hide
      </Button>
      <Separator
        orientation="vertical"
        className="h-5  text-dark bg-base-500"
      />
      <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
        Block Author
      </Button>
    </div>
  );
};

export default CommentCardFooter;
