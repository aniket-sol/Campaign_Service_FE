import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {toast} from "react-toastify";
import {
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  OfficeBuildingIcon,
  SpeakerphoneIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import { campaignAPI } from "../../api/campaign";
import { practiceAPI } from "../../api/practice";
import CreatePracticeModal from "./CreatePracticeModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import MessageModal from "../common/MessageModal"; // Import the MessageModal
import EditCampaignModal from "./EditCampaignModal";

const ManagementModal = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const { user } = useSelector((state) => state.auth);
  const [campaigns, setCampaigns] = useState([]);
  const [practices, setPractices] = useState([]);
  const [campaignHistory, setCampaignHistory] = useState([]);
  const [isCreatePractice, setIsCreatePractice] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [isEditCampaignModalOpen, setIsEditCampaignModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const isAdmin = user?.role === "Practice Admin";
  const isSuperAdmin = user?.is_super_admin === true;
  const MAX_PREVIEW_LENGTH = 30;

  useEffect(() => {
    if (open) {
      fetchCampaigns();
      fetchPractices();
      fetchCampaignHistory();
    }
  }, [open]);

  const fetchCampaigns = async () => {
    try {
      let response = null;

      if (isSuperAdmin) {
        response = await campaignAPI.getCampaigns();
      } else if (isAdmin) {
        response = await campaignAPI.getPracticeAdminCampaigns();
      }
      if (response) {
        setCampaigns(response.campaigns);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const fetchPractices = async () => {
    try {
      const response = await practiceAPI.getPractice();
      setPractices(response);
    } catch (error) {
      console.error("Error fetching practices:", error);
    }
  };

  const fetchCampaignHistory = async () => {
    try {
      const response = await campaignAPI.campaignHistory();
      console.log(response.campaign_sequences);
      setCampaignHistory(response.campaign_sequences);
    } catch (error) {
      console.error("Error fetching campaign history:", error);
    }
  };

  const handleCreateCampaign = async () => {
    try {
      await campaignAPI.createCampaign();
      fetchCampaigns();
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const handleCreatePractice = () => {
    setIsCreatePractice(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SENT":
        return "text-green-600";
      case "SCHEDULED":
        return "text-blue-600";
      case "FAILED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const handleDeletePractice = async (practiceId) => {
    try {
      setIsDeleting(true);

      const response = practiceAPI.deletePractice(practiceId);

      if (!response) {
        throw new Error("Failed to delete practice");
      }

      // Update the practices list by filtering out the deleted practice
      const updatedPractices = practices.filter(
        (practice) => practice.id !== practiceId
      );
      setPractices(updatedPractices);

      toast.success("Practice delete sucessfully")
    } catch (error) {
      console.error("Error deleting practice:", error);
      toast.error("Failed to delete practice. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReadMore = (campaign) => {
    setSelectedMessage(campaign.description); // Set the full description to be shown in the modal
  };
  const handleDeleteCampaign = async (campaignId) => {
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

  const openDeleteModal = (campaign) => {
    setCampaignToDelete(campaign);
    setIsDeleteModalOpen(true);
  };
  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setIsEditCampaignModalOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Management Dashboard</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger
              value="campaigns"
              className="flex items-center gap-2 w-1/3"
              onClick={() => setActiveTab("campaigns")}
            >
              <SpeakerphoneIcon className="w-5 h-5" />
              Campaigns
            </TabsTrigger>
            {isSuperAdmin && (
              <TabsTrigger
                value="practices"
                className="flex items-center gap-2 w-1/3"
                onClick={() => setActiveTab("practices")}
              >
                <OfficeBuildingIcon className="w-5 h-5" />
                Practices
              </TabsTrigger>
            )}
            <TabsTrigger
              value="history"
              className="flex items-center gap-2 w-1/3"
              onClick={() => setActiveTab("history")}
            >
              <ClockIcon className="w-5 h-5" />
              Campaign History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="min-h-[400px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Campaign Management</h3>
                {/* <Button
                  className="flex items-center gap-2"
                  onClick={handleCreateCampaign}
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  New Campaign
                </Button> */}
              </div>

              <div className="border rounded-lg divide-y">
                {campaigns.length > 0 &&
                  campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="p-4 flex flex-col space-y-2"
                    >
                      <h4 className="font-medium text-lg">{campaign.title}</h4>
                      {campaign.description.length <= MAX_PREVIEW_LENGTH ? (
                        <p className="text-sm text-gray-600">
                          {campaign.description}
                        </p>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600">
                            {campaign.description.substring(
                              0,
                              MAX_PREVIEW_LENGTH
                            )}
                            ...
                          </p>
                          <button
                            onClick={() => handleReadMore(campaign)}
                            className="text-blue-600 text-sm"
                          >
                            Read More
                          </button>
                        </div>
                      )}
                      <span className="text-xs text-gray-400">
                        Created on:{" "}
                        {new Date(campaign.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-blue-600"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </Button>
                        <Button
                          onClick={() =>
                            handleEditCampaign({
                              id: campaign.id,
                              title: campaign.title,
                              description: campaign.description,
                              status: campaign.status,
                            })
                          }
                          variant="ghost"
                          size="icon"
                          className="hover:text-yellow-600"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </Button>
                        <Button
                          onClick={() =>
                            openDeleteModal({
                              id: campaign.id,
                              title: campaign.title,
                            })
                          }
                          variant="ghost"
                          size="icon"
                          className="hover:text-red-600"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                {selectedMessage && (
                  <MessageModal
                    message={selectedMessage}
                    onClose={() => setSelectedMessage(null)}
                  />
                )}
                {/* Edit Modal */}
                <EditCampaignModal
                  isOpen={isEditCampaignModalOpen}
                  onClose={() => setIsEditCampaignModalOpen(false)}
                  campaign={selectedCampaign}
                  onSave={handleSaveCampaign}
                />
                <ConfirmDeleteModal
                  isOpen={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                  onConfirm={() => handleDeleteCampaign(campaignToDelete?.id)}
                  campaignName={campaignToDelete?.title}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="practices" className="min-h-[400px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Practice Management</h3>
                <Button
                  className="flex items-center gap-2"
                  onClick={handleCreatePractice}
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  New Practice
                </Button>
                <CreatePracticeModal
                  open={isCreatePractice}
                  onOpenChange={() => setIsCreatePractice(false)}
                />
              </div>

              <div className="border rounded-lg divide-y">
                {practices.map((practice) => (
                  <div
                    key={practice.id}
                    className="p-4 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium">{practice.name}</h4>
                      {/* <span className="text-sm text-gray-500">
                        Location: {practice.location}
                      </span> */}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-blue-600"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </Button> */}
                      {/* <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-yellow-600"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Button> */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-red-600"
                        onClick={() => handleDeletePractice(practice.id)}
                        disabled={isDeleting}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="min-h-[400px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Campaign History</h3>
              </div>

              <div className="border rounded-lg divide-y">
                {campaignHistory.length > 0 &&
                  campaignHistory.map((sequence) => (
                    <div
                      key={sequence.id}
                      className="p-4 flex flex-col space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-lg">
                            Campaign ID: {sequence.user_campaign_id}
                          </h4>
                          <p
                            className={`text-sm font-medium ${getStatusColor(
                              sequence.status
                            )}`}
                          >
                            Status: {sequence.status}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Created at: </span>
                            {new Date(sequence.created_at).toLocaleString()}
                          </p>
                          {sequence.status === "SENT" && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Sent on: </span>
                              {new Date(sequence.updated_at).toLocaleString()}
                            </p>
                          )}
                          {/* <p className="text-xs text-gray-400">
                          Created by ID: {sequence.created_by}
                        </p> */}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-blue-600"
                          title="View Details"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ManagementModal;
