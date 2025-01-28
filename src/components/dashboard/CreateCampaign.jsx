import React, { useState } from "react";
import { campaignAPI } from "../../api/campaign";
import { toast } from "react-toastify";
import CampaignModal from "./CampaignModal"; // Import the new Modal component

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    status: "DRAFT",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [modalData, setModalData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const campaign = await campaignAPI.createCampaign(campaignData);
      console.log(campaign);
      toast.success("Campaign created successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSaveAndSend = () => {
    handleSubmit();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = async (data) => {
    // setModalData((prevData) => {
    //   const updatedData = { ...prevData, ...data }; // Merge the new data with the existing data
    //   return updatedData;
    // });

    try {
      console.log(data);
      console.log(campaignData);
      // Create the campaign
      const campaign = await campaignAPI.createCampaign(campaignData);
      console.log(campaign)
      const updatedModalData = { ...data, user_campaign_id: campaign.campaign.id }; // Add the campaign.id to modalData

      // Create the campaign sequence with the updated modalData
      const campaignSequence = await campaignAPI.createCampaignSequence(
        updatedModalData
      );
      console.log(campaignSequence);
      toast.success("Campaign scheduled successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={campaignData.title}
            onChange={(e) =>
              setCampaignData({ ...campaignData, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            rows="3"
            value={campaignData.description}
            onChange={(e) =>
              setCampaignData({ ...campaignData, description: e.target.value })
            }
            required
          />
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleSaveAndSend}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Save and Send
          </button>
        </div>
      </form>

      {/* Modal Component for Save and Send */}
      <CampaignModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </div>
  );
};

export default CreateCampaign;

