import { LiaHomeSolid } from "react-icons/lia";
import { TbReportAnalytics } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import TextField from "@mui/material/TextField";

const ICON_SIZE = 28;

const navbarItem = [
    { name: "Home", path: "/", icon: <LiaHomeSolid size={ICON_SIZE} /> },
    { name: "Report", path: "/report", icon: <TbReportAnalytics size={ICON_SIZE} />},
    { name: "Setting", path: "/setting", icon:  <IoSettingsOutline size={ICON_SIZE} />},
];


function Header() {
  return (
    <div className="flex flex-col w-screen">
      <div className="w-full px-4 py-3  shadow-md flex justify-center items-center">
        <h2 className="font-bold text-xl">Talai NEXT</h2>
      </div>

      <div className="my-3 mx-[5px] flex justify-between">
        {navbarItem.map((item, index) => (
            <a key={index} href={item.path} className="flex w-[30%] flex-col items-center text-gray-600 dark:text-white dark:hover:text-blue-500 hover:text-blue-500 cursor-pointer">
                {item.icon}
                <span className="text-sm mt-1">{item.name}</span>
            </a>
        ))}
      </div>

    </div>
  );
}

export default Header;