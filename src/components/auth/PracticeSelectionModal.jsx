// src/components/PracticeSelectionModal.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { practiceLogout } from "../../store/slices/practiceSlice";

export const PracticeSelectionModal = ({
  isOpen,
  onClose,
  onProceedWithoutPractice,
}) => {
//   const { enrolledPractices } = useSelector((state) => state.practice);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const dispatch = useDispatch();

  const handleSelectPractice = () => {
    if (selectedPractice) {
      // Handle practice selection
      console.log("Practice Selected:", selectedPractice);
      // Store practice data in localStorage or update Redux state
      localStorage.setItem("practice", JSON.stringify(selectedPractice));
      onClose();
    } else {
      onProceedWithoutPractice();
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

        <h2 className="text-2xl font-bold mb-4">Select a Practice</h2>
        <div className="space-y-4">
          {enrolledPractices.length > 0 ? (
            enrolledPractices.map((practice) => (
              <div key={practice.practice_id} className="flex items-center">
                <input
                  type="radio"
                  id={practice.practice_id}
                  name="practice"
                  value={practice.practice_id}
                  onChange={() => setSelectedPractice(practice)}
                  className="mr-2"
                />
                <label>{practice.practice_name}</label>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              You are not enrolled in any practices.
            </p>
          )}
        </div>

        <button
          onClick={handleSelectPractice}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};
