import { IoMdNotifications } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed p-1 top-0 left-48 right-0 shadow-md bg-white border border-gray-300 rounded-tr-lg">
      <div className="flex flex-row items-center justify-between">
        <div className="text-center p-3">
          <h1 className="font-semibold">Market Information</h1>
        </div>

        {/* <div className="flex items-center border rounded-3xl px-2 py-2 w-96">
          <input
            type="text"
            placeholder="Search anything in FTMA..."
            className="w-full focus:outline-none text-sm"
          />
          <FiSearch className="text-gray-900 mr-2" />
        </div> */}

        <div className="flex">
          <IoMdNotifications
            size={24}
            className="rounded-full  m-1 cursor-pointer"
          />
          <RiLogoutBoxRLine
            onClick={() => navigate("/")}
            size={24}
            className="rounded-full  m-1 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
