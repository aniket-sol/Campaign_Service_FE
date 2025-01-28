import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { practiceAPI } from "../../api/practice";
import { toast} from "react-toastify";
import { authAPI } from "../../api/auth";

const JoinPracticeRequest = () => {
  const [selectedPractice, setSelectedPractice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [practices, setPractices] = useState([]);

//   Fetch dropdown items from API
  useEffect(() => {
    const fetchPracticeList = async () => {
      try {
        const response = await practiceAPI.getPractice(); // Replace with your API call
        setPractices(response);
        console.log(response.data);
      } catch (err) {
        console.error("Failed to fetch dropdown items:", err);
        toast.error("Failed to load practices. Please try again.");
      }
    };
    fetchPracticeList();
  }, []);

  const handleRequestJoin = async () => {
    if (!selectedPractice) {
      toast.error("Please select a practice first.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Add your API call here
      // await requestJoinPractice(selectedPractice);
      await authAPI.requestJoin({ practice_id: selectedPractice }); // Send practice_id as payload

      toast.success("Join request sent successfully!");

      setSelectedPractice("");
    } catch (error) {
        console.log(error);
        toast.error("Failed to send join request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Select Practice
        </label>
        <Select value={selectedPractice} onValueChange={setSelectedPractice}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a practice" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {practices.map((practice) => (
                <SelectItem key={practice.id} value={practice.id.toString()}>
                  {practice.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full"
        onClick={handleRequestJoin}
        disabled={!selectedPractice || isSubmitting}
      >
        {isSubmitting ? "Sending Request..." : "Request to Join"}
      </Button>
    </div>
  );
};

export default JoinPracticeRequest;
