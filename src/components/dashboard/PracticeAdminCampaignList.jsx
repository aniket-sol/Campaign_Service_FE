import { useEffect, useState } from "react";
import { campaignAPI } from "../../api/campaign"; // Import your API functions
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  PencilIcon,
  TrashIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline"; // You can use HeroIcons or FontAwesome
import EditCampaignModal from "./EditCampaignModal";
import CampaignModal from "./CampaignModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import MessageModal from "../common/MessageModal"; // Import the MessageModal

const PracticeAdminCampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null); // For storing the full description
  const MAX_PREVIEW_LENGTH = 30;

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await campaignAPI.getPracticeAdminCampaigns(); // Replace with your API call
        setCampaigns(response.campaigns); // Assuming the API response contains the data array
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load campaigns");
        setLoading(false);
      }
    };

    if (user?.session_token) {
      fetchCampaigns();
    }
  }, [user?.session_token]);
  const handleSendModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsSendModalOpen(true);
  };

  const handleSendModalClose = () => {
    setIsSendModalOpen(false);
  };

  const handleSendModalSave = async (data) => {
    try {
      const updatedModalData = {
        ...data,
        user_campaign_id: selectedCampaign.id,
      }; // Add the campaign.id to modalData

      // Create the campaign sequence with the updated modalData
      const campaignSequence = await campaignAPI.createCampaignSequence(
        updatedModalData
      );
      console.log(campaignSequence);
      // console.log(updatedModalData);
      toast.success("Campaign scheduled successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Dummy API calls for Edit, Delete, and Send
  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleDelete = async (campaignId) => {
    try {
      const response = await campaignAPI.deleteCampaign(campaignId);
      console.log(response);
      setCampaigns(campaigns.filter((campaign) => campaign.id !== campaignId));
      setIsDeleteModalOpen(false);
      toast.success("Campaign deleted successfully!");
    } catch (e) {
      console.log(e);
      setIsDeleteModalOpen(false);
      toast.error("Could not delete the campaign!");
    }
  };

  const openDeleteModal = (campaign) => {
    setCampaignToDelete(campaign);
    setIsDeleteModalOpen(true);
  };

  const handleSaveCampaign = async (updatedCampaign) => {
    // Handle saving the updated campaign (e.g., update state or refetch data)
    try {
      const response = await campaignAPI.updateCampaign(
        updatedCampaign.id,
        updatedCampaign
      );
      toast.success("Campaign Updated Sucessfully!");
      console.log(response);
    } catch (err) {
      toast.error("Could not update Campaign!");
      console.log(err);
    }
    console.log("Updated Campaign:", updatedCampaign);
  };

  // Function to handle 'Read More' click and show the full message in a modal
  const handleReadMore = (campaign) => {
    setSelectedMessage(campaign.description); // Set the full description to be shown in the modal
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

//   if (!campaigns.length) {
//     return <div>No campaigns found</div>;
//   }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        {"Your Campaigns"}
        {"  (" + campaigns.length + ")"}
      </h2>
      <div className="space-y-4">
        {/* {campaigns.length == 0 && "No campaigns"} */}
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-medium">{campaign.title}</h3>
                {campaign.description.length <= MAX_PREVIEW_LENGTH && (
                  <p className="text-sm text-gray-600">
                    {campaign.description}
                  </p>
                )}
                {/* Show Read More link if description length exceeds 30 characters */}
                {campaign.description.length > MAX_PREVIEW_LENGTH && (
                  <button
                    onClick={() => handleReadMore(campaign)}
                    className="text-blue-600 text-sm"
                  >
                    Read More
                  </button>
                )}
                {/* {campaign.description.length > MAX_PREVIEW_LENGTH
                  ? `${campaign.description.substring(0, MAX_PREVIEW_LENGTH)}...`
                  : campaign.description}
                {campaign.description.length > MAX_PREVIEW_LENGTH && (
                  <span className="text-blue-600 ml-1">Read more</span>
                )} */}
              </div>
              <div className="flex gap-4">
                <button
                onClick={() =>
                    handleEditCampaign({
                    id: campaign.id,
                    title: campaign.title,
                    description: campaign.description,
                    status: campaign.status,
                    })
                }
                className="text-blue-500 hover:text-blue-700"
                >
                <PencilIcon className="h-5 w-5" />
                </button>
                
                <button
                onClick={() =>
                    openDeleteModal({
                    id: campaign.id,
                    title: campaign.title,
                    })
                }
                className="text-red-500 hover:text-red-700"
                >
                <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    handleSendModal({
                      id: campaign.id,
                      title: campaign.title,
                      description: campaign.description,
                      status: campaign.status,
                    })
                  }
                  className="text-green-500 hover:text-green-700"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === "SENT"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                Created: {new Date(campaign.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(campaignToDelete?.id)}
        campaignName={campaignToDelete?.title}
      />

      {/* Message Modal for displaying the full description */}
      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}

      {/* Modal Component for Save and Send */}
      <CampaignModal
        isOpen={isSendModalOpen}
        onClose={handleSendModalClose}
        onSave={handleSendModalSave}
      />
      {/* Edit Modal */}
      <EditCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaign={selectedCampaign}
        onSave={handleSaveCampaign}
      />
    </div>
  );
};

export default PracticeAdminCampaignList;
