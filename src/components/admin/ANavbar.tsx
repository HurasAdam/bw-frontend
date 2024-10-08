import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../../services/authApi";
import { NavLink } from "react-router-dom";
import NotificationPanel from "../core/NotificationPanel";
import UserAvatar from "../core/userAvatar";
import Drawer from "../core/Drawer";
import SearchModal from "../core/SearchModal";



const ANavbar: React.FC = ({ notifications }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false)


  const { mutate } = useMutation({
    mutationFn: () => {
      return authApi.logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["validateToken"]);
    },
  });

  const logoutHandler = () => {
    console.log("logout");
    mutate();
  };

  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-[18px] sticky z-40 top-0 border-b rounded-tl-2xl ">
      <div className="flex gap-4">
        <button
          // onClick={()=>dispatch(setOpenSidebar(true))}
          className="text-2xl text-gray-500 block md:hidden"
        >
          <GiHamburgerMenu />
        </button>

        {/* <div className="w-40  md:w-[250px] lg:w-[350px] flex items-center py-2 px-3 gap-2 rounded-full bg-slate-100 ">
          <MdOutlineSearch />
          <button className="w-full text-left px-1.5 hover:text-blue-200  text-gray-400 text-sm" onClick={() => setIsModalOpen(true)}>Szukaj</button>
          <SearchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </div> */}
      </div>

      <div className="flex gap-1 lg:gap-3 items-center">
        <NavLink
          className="bg-blue-700 hover:bg-blue-600   transition-all hover:font-bold px-2.5  py-1 rounded-full  font-semibold  text-slate-100 "
          to="articles/new-article"
        >
          +
        </NavLink>
        <NotificationPanel notifications={notifications} />
        <Drawer />
        <UserAvatar logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default ANavbar;
