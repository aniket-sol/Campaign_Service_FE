import { useSelector } from "react-redux";
import UserInfoSection from "../components/dashboard/UserInfoSection";
import CampaignList from "../components/dashboard/CampaignList";
import MessageBox from "../components/dashboard/MessageBox";
import RequestAdminAccess from "../components/dashboard/RequestAdminAccess";
import JoinPracticeRequest from "../components/dashboard/JoinPracticeRequest";
import AdminRequestManager from "../components/dashboard/AdminRequestManager";
import CreateCampaign from "../components/dashboard/CreateCampaign";
import PracticeAdminCampaignList from "../components/dashboard/PracticeAdminCampaignList";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "Practice Admin";
  const isUser = user?.role === "Practice User";
  const newUser = user?.role == null;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-3">
            <UserInfoSection />
          </div>

          {/* Middle Column - Campaigns */}
          <div className="lg:col-span-5">
            {!newUser && <MessageBox />}
            {newUser && <JoinPracticeRequest/>}
            {isAdmin && <CampaignList />}
            {isAdmin && <PracticeAdminCampaignList/>}
          </div>

          {/* Right Column - Messages */}
          <div className="lg:col-span-4">
            {isUser && <RequestAdminAccess/>}
            {isAdmin && <CreateCampaign/>}
            {isAdmin && <AdminRequestManager/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
