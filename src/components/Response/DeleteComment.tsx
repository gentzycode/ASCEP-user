import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash } from "iconsax-react";
import { Button } from "../ui/button";
import { useDeleteComment } from "@/api/response";

export function DeleteComment({ commentId }: { commentId: number }) {
  const { mutate: deleteComment, isLoading } = useDeleteComment();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Trash size={18} className="ml-auto" color="red" />
      </PopoverTrigger>
      <PopoverContent align="end" className="flex flex-col gap-4 w-80">
        <h3 className="text-lg text-center text-dark">
          Are you sure you want to delete this comment?
        </h3>

        <Button
          onClick={() => deleteComment(commentId)}
          isLoading={isLoading}
          className="mx-auto"
          size="sm"
          variant="primary"
        >
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
}
