import { useRef } from "react";

const useScrollToComments = () => {
  const commentsSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToComments = () => {
    commentsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    commentsSectionRef,
    scrollToComments,
  };
};

export default useScrollToComments;
