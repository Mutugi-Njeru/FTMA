import { IoMdNotifications } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { logout } from "../service/AuthService";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="fixed p-1 top-0 left-48 right-0 shadow-md bg-white border border-gray-300 rounded-tr-lg">
      <div className="flex flex-row items-center justify-between">
        <div className="text-center p-3">
          <h1 className="font-semibold">Market Information</h1>
        </div>
        <div className="flex">
          <IoMdNotifications
            size={24}
            className="rounded-full  m-1 cursor-pointer"
          />
          <RiLogoutBoxRLine
            onClick={handleLogout}
            size={24}
            className="rounded-full  m-1 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
