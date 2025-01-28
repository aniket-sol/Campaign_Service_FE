import { useSelector } from "react-redux";
import UserInfoSection from "../components/dashboard/UserInfoSection";
import CampaignList from "../components/dashboard/CampaignList";
import MessageBox from "../components/dashboard/MessageBox";
import RequestAdminAccess from "../components/dashboard/RequestAdminAccess";
import JoinPracticeRequest from "../components/dashboard/JoinPracticeRequest";
import AdminRequestManager from "../components/dashboard/AdminRequestManager";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "Practice Admin";
  const isUser = user?.role === "Practice User";
  const newUser = user?.role == null;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-3">
            <UserInfoSection />
          </div>

          {/* Middle Column - Campaigns */}
          <div className="lg:col-span-6">
            {!newUser && <MessageBox />}
            {newUser && <JoinPracticeRequest/>}
            {isAdmin && <CampaignList />}
          </div>

          {/* Right Column - Messages */}
          <div className="lg:col-span-3">
            {isUser && <RequestAdminAccess/>}
            {isAdmin && <AdminRequestManager/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
