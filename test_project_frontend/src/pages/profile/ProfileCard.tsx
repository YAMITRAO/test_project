import { useContext } from "react";
import profileAvtar from "../../assets/images/avtar/avtar123.jpg";
import { FaFreeCodeCamp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { SiTinkercad } from "react-icons/si";
import UserContext from "../../context/user_context/UserContext";

const ProfileCard = () => {
  const { state } = useContext(UserContext);
  return (
    <div className="w-fit mx-auto  px-6 py-6  text-center bg-gray-800 rounded-lg lg:mt-4 xl:px-10">
      {/* main container */}
      <div className="space-y-4 xl:space-y-6 flex gap-4 ">
        {/* user img */}
        <div className="w-fit relative flex">
          <img
            className="mx-auto rounded-[30px] h-36 w-36"
            src={profileAvtar}
            alt="author avatar"
          />
          {/*edit profile image*/}
          <button className="w-[100%] absolute bottom-0 text-white  rounded-b-[40px] bg-slate-600 hover:bg-slate-700 transition-all ">
            Change
          </button>
        </div>
        {/* user details */}
        <div className="space-y-2">
          <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
            <h3 className="text-white capitalize">{state.userName}</h3>
            <p className="text-indigo-300 font-light">{state.userEmail}</p>
            {/* web icons  */}
            <div className="flex justify-center items-center mt-5 space-x-5">
              {/* icon1  */}
              <a
                href="#"
                target="_blank"
                className="inline-block text-gray-400"
              >
                <span className="text-3xl">
                  <FaFreeCodeCamp />
                </span>
              </a>
              {/* icon2 */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-gray-400"
              >
                <span className="text-[26px]">
                  <FaGithub />
                </span>
              </a>
              {/* icon3 */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-gray-400"
              >
                <span className="text-[22px]">
                  <SiTinkercad />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
