import React, { useState, useEffect } from "react";
import { PencilIcon, XIcon } from "@heroicons/react/outline";
import { Button } from "../ui/button";
import { campaignAPI } from "../../api/campaign"; // Assuming your API utilities are here

const EditCampaignModal = ({ isOpen, onClose, campaign, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Populate the modal with campaign data when it is opened
  useEffect(() => {
    if (campaign && isOpen) {
      setTitle(campaign.title);
      setDescription(campaign.description);
      setStatus(campaign.status);
    }
  }, [campaign, isOpen]);

  // Handle form submission
  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      // API call to update the campaign
    //   await campaignAPI.updateCampaign(campaign.id, {
    //     title,
    //     description,
    //     status,
    //   });
      onSave({ id: campaign.id, title, description, status });
      onClose();
    } catch (err) {
      setError("Failed to update campaign");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Edit Campaign</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4">
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter campaign title"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter campaign description"
              rows={4}
            />
          </div>

          {/* Status Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SCHEDULED">Scheduled</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCampaignModal;
