import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "../../api/auth";
import { logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import CreatePracticeModal from "../dashboard/CreatePracticeModal";
import ChangePasswordModal from "../dashboard/ChangePasswordModal";
import ManagementModal from "../dashboard/ManagementModal";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);
  const [isPracticeManagementModal, setIsPracticeManagementModal] = useState(false);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      dispatch(logout());
      toast.success("Logout successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // const handleCreatePractice = () => {
  //   setIsOpen(false); // Close the dropdown
  //   setShowPracticeModal(true); // Open the modal
  // };
  const handleChangePassword = () =>{
    console.log("Opening Change Password Modal");
    setIsChangePasswordModal(true);
  }

  const handlePracticeManagement = () => {
    setIsPracticeManagementModal(true);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
      >
        <span>Hi, {user?.username}</span>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          {/* {user?.is_super_admin && (
            <button
              onClick={handleCreatePractice}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Create Practice
            </button>
          )} */}
          <button
            onClick={handleChangePassword}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Change Password
          </button>
          <ChangePasswordModal
            isOpen={isChangePasswordModal}
            onClose={() => setIsChangePasswordModal(false)}
          />
          <button
            onClick={handlePracticeManagement}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Management
          </button>
          <ManagementModal
            open={isPracticeManagementModal}
            onOpenChange={()=> setIsPracticeManagementModal(false)}
          />
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}

      {/* Create Practice Modal */}
      <CreatePracticeModal
        open={showPracticeModal}
        onOpenChange={setShowPracticeModal}
      />
    </div>
  );
};
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { authAPI } from "../../api/auth";
// import { logout } from "../../store/slices/authSlice";
// import { toast } from "react-toastify";
// import CreatePracticeModal from "../dashboard/CreatePracticeModal";

// export const UserMenu = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await authAPI.logout();
//       dispatch(logout());
//       toast.success("Logout successfully!");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
//       >
//         <span>Hi, {user?.username}</span>
//         <svg
//           className={`w-5 h-5 transition-transform ${
//             isOpen ? "rotate-180" : ""
//           }`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
//           {/* {user?.roleType=="Super Admin" &&
//           <button
//             onClick={openPracticeModal}
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Create Practice
//           </button> } */}
//           <button
//             onClick={handleLogout}
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };
