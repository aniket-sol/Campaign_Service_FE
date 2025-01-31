import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../../hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { practiceAPI } from "../../api/practice";
import { toast } from "react-toastify";

const CreatePracticeModal = ({ open, onOpenChange }) => {
  // State to hold the object with a name field
  const [practice, setPractice] = useState({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!practice.name.trim()) {
      toast({
        title: "Error",
        description: "Practice name is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // API call with the practice object
      const createdPractice = await practiceAPI.createPractice(practice);
      console.log(createdPractice);
      toast.success("Practice created successfully!");

      // Reset the state and close the modal
      setPractice({ name: "" });
      onOpenChange(false);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Practice</DialogTitle>
            <DialogDescription>
              Enter the name for your new practice below.
            </DialogDescription>
          </DialogHeader>

          <div className="my-6">
            <Label htmlFor="practiceName">Practice Name</Label>
            <Input
              id="practiceName"
              value={practice.name} // Bind to the 'name' field of the object
              onChange={(e) =>
                setPractice({ ...practice, name: e.target.value })
              } // Update only the 'name' field
              placeholder="Enter practice name"
              className="mt-2"
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Practice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePracticeModal;
