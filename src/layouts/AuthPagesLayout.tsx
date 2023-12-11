import { useAuthContext } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthPagesLayout() {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn) return <Navigate to="/main" />;

  return (
    <div className="relative min-h-screen bg-[#F5F5F5] ">
      {/* <div className="absolute top-0 left-0 w-full h-full bg-white rounded-[40px] "></div> */}
      <div className="absolute top-0 right-0 w-[70%] h-full bg-[#292925] rounded-l-[40px]"></div>
      <div className="absolute top-0 right-0 w-[55%] h-full bg-[#FFC334]/10 rounded-l-[40px]">
        {/* <div className="w-[30%] "> */}
        <img
          src="/images/little-girl.png"
          className="absolute bottom-0 object-cover object-center w-[33%]"
          alt=""
        />
        {/* </div> */}
      </div>
      <div className="absolute top-0 right-0 w-[37%] h-full bg-[#FFC334]/20 rounded-l-[40px]">
        <img
          src="/images/woman.png"
          className="absolute bottom-0 object-cover object-center w-[50%]"
          alt=""
        />
      </div>
      <div className="absolute top-0 right-0 w-[19%] h-full bg-[#FFC334]/30 rounded-l-[40px]">
        <img
          src="/images/man.png"
          className="absolute bottom-0 object-cover object-center "
          alt=""
        />
      </div>

      <div className="relative z-10 px-20 py-14">
        <Outlet />
      </div>
    </div>
  );
}
