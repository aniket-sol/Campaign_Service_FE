import React from "react";
import { Button } from "../ui/button"; // Assuming you have a Button component

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, campaignName }) => {
  if (!isOpen) return null; // Don't render the modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-4">
          Are you sure you want to delete the campaign &quot;{campaignName}
          &quot;?
        </p>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Yes, Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
