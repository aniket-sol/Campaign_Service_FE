import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle2, XCircle, Check, X } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { authAPI } from "../../api/auth";



export const AdminRequestManager = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [action, setAction] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch data from the backend
    const fetchRequests = async () => {
      try {
        let response;
          if (user?.is_super_admin) {
            // Fetch all practices for super admin
            response = await authAPI.userRequests(); // Replace with your backend API endpoint
          } else {
            // Use practice_id and practice_name from the redux user object
            response = await authAPI.practiceUserRequests(user?.practice_id);
          }

        // const response = await authAPI.userRequests(); // Adjust this URL to match your API endpoint
        const data = response.entries;

        // Format the data to match the required structure
        const formattedRequests = data.map((entry) => ({
          id: entry.id, // Assuming user_id is the unique identifier for each request
          user_id: entry.user_id,
          user: entry.user_first_name + " " + entry.user_last_name,
          practice: entry.practice_name,
          practice_id: entry.practice_id,
          status: "pending", 
          date: new Date(entry.created_at).toLocaleDateString(), // Format the created_at date
          role: entry.role, // Adding role from the backend
        }));

        // Set the requests state with the formatted data
        setRequests(formattedRequests);
      } catch (error) {
        console.error("There was an error fetching the requests!", error);
      }
    };

    fetchRequests();
  }, []);

  const handleAction = (requestId, actionType) => {
    setSelectedRequest(requestId);
    setAction(actionType);
    setShowDialog(true);
  };

  // Function to call the API to update the request status
  const updateRequestStatus = async (id, userId, practiceId, status, role) => {
    try {
      await authAPI.updateRequestStatus(id, {
        user_id: userId,
        practice_id: practiceId,
        status: status,
        role: role,
      });
    } catch (error) {
      console.error("Error updating the request status:", error);
      toast({
        title: "Error",
        description: "There was an error updating the request status.",
        icon: <XCircle className="text-red-500" />,
      });
    }
  };

  const confirmAction = () => {
    const newRequests = requests.map((req) => {
      if (req.id === selectedRequest) {
        const updatedRequest = { ...req, status: action };
        updateRequestStatus(
          req.id,
          req.user_id,
          req.practice_id,
          action === "approved",
          req.role
        ); // API call here
        return updatedRequest;
      }
      return req;
    });
    setRequests(newRequests);
    setShowDialog(false);

    toast({
      title: `Request ${action === "approved" ? "Approved" : "Rejected"}`,
      description: `The admin request has been ${action}`,
      icon:
        action === "approved" ? (
          <CheckCircle2 className="text-green-500" />
        ) : (
          <XCircle className="text-red-500" />
        ),
    });
  };

  return (
    // <div className="p-4 max-w-4xl mx-auto space-y-4">
    <div className="shadow-md">
      <Card>
        <CardHeader>
          <CardTitle>{user?.is_super_admin && "Admin"} Access Requests</CardTitle>
          <CardDescription>
            {user?.is_super_admin && "Manage practice admin access requests"}
            {user?.role === "Practice Admin" &&
              "Manage Access Requests for New Joiners"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests && requests.length > 0 ? (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 transition-all duration-200 hover:shadow-lg animate-fadeIn"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">{request.user}</h3>
                      <p className="text-sm text-gray-500">
                        {request.practice}
                      </p>
                      <p className="text-sm text-gray-500">{request.role}</p>
                      <p className="text-xs text-gray-400">
                        Requested on: {request.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          request.status === "pending"
                            ? "secondary"
                            : request.status === "approved"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </Badge>
                      {request.status === "pending" && (
                        <div className="flex gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
                                  onClick={() =>
                                    handleAction(request.id, "approved")
                                  }
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Approve Request</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                                  onClick={() =>
                                    handleAction(request.id, "rejected")
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reject Request</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No active entries</p>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {action} this admin access request?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default AdminRequestManager;
