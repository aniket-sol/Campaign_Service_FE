import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { practiceAPI } from "../../api/practice";

const CampaignModal = ({ isOpen, onClose, onSave }) => {
  const [selectedPractices, setSelectedPractices] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [status, setStatus] = useState("SCHEDULED"); // Default status
  const [scheduledDate, setScheduledDate] = useState(""); // Single field for date and time
  const [practices, setPractices] = useState([]); // Stores practices fetched from backend
  const [loading, setLoading] = useState(false); // Loading state for practices
  const { user } = useSelector((state) => state.auth);


  // Fetch practices from the backend API
  useEffect(() => {
    const fetchPractices = async () => {
      try {
        setLoading(true);

        let response;
        if (user?.is_super_admin) {
          // Fetch all practices for super admin
          response = await practiceAPI.getPractice(); // Replace with your backend API endpoint
        } else {
          // Use practice_id and practice_name from the redux user object
          response = [
            {
              id: user?.practice_id,
              name: user?.practice_name,
            },
          ];
        }

        // console.log(response);
        setPractices(response); // Assuming response is an array of practice objects
      } catch (error) {
        console.error("Error fetching practices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPractices();
  }, []);

  // Set scheduled date to the current date and time if the status is "SENT"
  useEffect(() => {
    if (status === "SENT") {
      const currentDate = new Date();
      setScheduledDate(currentDate.toISOString().slice(0, 16)); // Formats as 'YYYY-MM-DDTHH:mm'
    }
  }, [status]);

  const handleSave = () => {
    const modalData = {
      practices: selectedPractices, // Send practice IDs (not names)
      roles: selectedRole,
      status, // Save the status
      scheduled_date: scheduledDate, // Save the scheduled date/time
    };
    onSave(modalData); // Send data to parent
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Campaign Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>
        <div className="mt-4">
          {/* Select Practice */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Practice
            </label>
            {loading ? (
              <p>Loading practices...</p>
            ) : (
              <select
                multiple
                value={selectedPractices}
                onChange={(e) =>
                  setSelectedPractices(
                    [...e.target.selectedOptions].map((option) => option.value)
                  )
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                {practices.map((practice) => (
                  <option key={practice.id} value={practice.id}>
                    {practice.name}{" "}
                    {/* Displaying practice name, but sending practice ID */}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Select Role */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <div className="flex gap-4">
              <div>
                <input
                  type="checkbox"
                  value="Practice Admin"
                  checked={selectedRole.includes("Practice Admin")}
                  onChange={() =>
                    setSelectedRole((prev) =>
                      prev.includes("Practice Admin")
                        ? prev.filter((role) => role !== "Practice Admin")
                        : [...prev, "Practice Admin"]
                    )
                  }
                />
                <label className="ml-2">Practice Admin</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Practice User"
                  checked={selectedRole.includes("Practice User")}
                  onChange={() =>
                    setSelectedRole((prev) =>
                      prev.includes("Practice User")
                        ? prev.filter((role) => role !== "Practice User")
                        : [...prev, "Practice User"]
                    )
                  }
                />
                <label className="ml-2">Practice User</label>
              </div>
            </div>
          </div>

          {/* Select Status */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="flex gap-4">
              <div>
                <input
                  type="radio"
                  value="SCHEDULED"
                  checked={status === "SCHEDULED"}
                  onChange={() => setStatus("SCHEDULED")}
                />
                <label className="ml-2">Scheduled</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="SENT"
                  checked={status === "SENT"}
                  onChange={() => setStatus("SENT")}
                />
                <label className="ml-2">Immediately</label>
              </div>
            </div>
          </div>

          {status === "SCHEDULED" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheduled Date and Time
              </label>
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          )}

          {status === "SENT" && (
            <div className="mt-4 text-sm text-gray-500">
              <p>
                The campaign will be sent immediately, and no scheduled date is
                required.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignModal;
