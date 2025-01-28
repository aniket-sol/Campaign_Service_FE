import { useState } from "react";
import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { authAPI } from "../../api/auth";

// Practice User Component
export const RequestAdminAccess = () => {
  const { toast } = useToast();
  const [hasRequested, setHasRequested] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleRequest = async () => {
    setIsSubmitting(true);
    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await authAPI.requestJoin({
      practice_id: user?.practice_id,
      role: "Practice Admin"
    });

    setHasRequested(true);
    setIsSubmitting(false);

    toast({
      title: "Request Submitted",
      description: "Your admin access request has been submitted successfully.",
      icon: <CheckCircle2 className="text-green-500" />,
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Request Admin Access</CardTitle>
        <CardDescription>
          Submit a request to become an admin for your practice
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasRequested ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              As an admin, youll have additional permissions to manage your
              practice settings and users.
            </p>
            <Button
              className="w-full"
              onClick={handleRequest}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Admin Access"}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-2 py-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="font-medium">Request Submitted</h3>
            <p className="text-sm text-gray-500">
              Your request has been sent to the super admin for review. Youll
              be notified once its processed.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestAdminAccess;
