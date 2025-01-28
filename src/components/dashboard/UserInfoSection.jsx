import { useSelector } from "react-redux";

// User Info Component
const UserInfoSection = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
          {user?.name?.charAt(0)}
        </div>
        <h2 className="text-xl font-semibold mb-2">{user?.name}</h2>
        <p className="text-gray-600 mb-10">{user?.email}</p>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
          {user?.is_super_admin && "Super Admin"}
          {user?.role}
        </span>
        <p className="text-gray-600 mb-2">{user?.practice_name}</p>
      </div>

      <div className="mt-2 border-t pt-4">
        <h3 className="text-lg font-medium mb-3">Account Info</h3>
        <div className="space-y-2 text-sm">
          <p className="flex justify-between">
            <span className="text-gray-600">Member Since</span>
            <span className="font-medium">Jan 2025</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Campaigns Created</span>
            <span className="font-medium">12</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Last Active</span>
            <span className="font-medium">Today</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;