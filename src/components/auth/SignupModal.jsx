import { useState} from "react";
import { authAPI } from "../../api/auth";
import { toast } from "react-toastify";

export const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  // const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // practice_id: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      console.log(userData);
      const user = await authAPI.signup(userData);
      console.log(user);
      toast.success("Signup successful!");
      // dispatch(loginSuccess(user));
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={userData.first_name}
              onChange={(e) =>
                setUserData({ ...userData, first_name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={userData.last_name}
              onChange={(e) =>
                setUserData({ ...userData, last_name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={userData.confirmPassword}
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
              required
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Dropdown Menu
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={userData.practice_id}
              onChange={(e) =>
                setUserData({ ...userData, practice_id: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              {PracticeList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div> */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <button
          onClick={onSwitchToLogin}
          className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout,
// } from "../../store/slices/authSlice";
// import { authAPI } from "../../api/auth";

// export const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
//   const dispatch = useDispatch();
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (userData.password !== userData.confirmPassword) {
//       setError("Passwords don't match");
//       return;
//     }

//     setError(null);
//     setLoading(true);

//     try {
//       const user = await authAPI.signup(userData);
//       dispatch(loginSuccess(user));
//       onClose();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//           aria-label="Close"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//               value={userData.name}
//               onChange={(e) =>
//                 setUserData({ ...userData, name: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//               value={userData.email}
//               onChange={(e) =>
//                 setUserData({ ...userData, email: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//               value={userData.password}
//               onChange={(e) =>
//                 setUserData({ ...userData, password: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//               value={userData.confirmPassword}
//               onChange={(e) =>
//                 setUserData({ ...userData, confirmPassword: e.target.value })
//               }
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
//           >
//             {loading ? "Loading..." : "Sign Up"}
//           </button>
//         </form>
//         <button
//           onClick={onSwitchToLogin}
//           className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
//         >
//           Already have an account? Login
//         </button>
//       </div>
//     </div>
//   );
// };
