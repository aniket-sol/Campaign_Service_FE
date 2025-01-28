import UserInfoSection from "../components/dashboard/UserInfoSection";
import CreateCampaign from "../components/dashboard/CreateCampaign";
import CampaignList from "../components/dashboard/CampaignList";
import AdminRequestManager from "../components/dashboard/AdminRequestManager";

const AdminPanel = () => {
  // const { user } = useSelector((state) => state.auth);
  // const isSuperAdmin = user?.roleType === "super_admin";

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-3">
            <UserInfoSection />
          </div>
          {/* Middle Column - Campaigns */}
          <div className="lg:col-span-6">
            {<CreateCampaign />}
            <CampaignList />
          </div>

          {/* Right Column - Messages */}
          <div className="lg:col-span-3">
            {<AdminRequestManager />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
