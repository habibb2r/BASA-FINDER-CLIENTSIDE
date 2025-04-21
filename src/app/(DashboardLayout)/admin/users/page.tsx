"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllUsers,  } from "@/services/Admin"; // Adjust import path as needed
import { blockUser, activateUser } from "@/services/Users"; // Adjust import path as needed
import { toast } from "sonner";
import { Loader2,  Lock, Unlock } from "lucide-react";

// Define interface for user data
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isBlocked: boolean;
}

const UsersManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<{
    [key: string]: boolean;
  }>({});

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers();
        console.log("response", response);
        if (response.success) {
          setUsers(response.data || []);
        } else {
          toast.error(response.message || "Failed to fetch users");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("An error occurred while fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle block/unblock user
  const handleToggleUserStatus = async (
    userId: string,
    isCurrentlyBlocked: boolean
  ) => {
    setActionLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      const response = isCurrentlyBlocked
        ? await activateUser(userId)
        : await blockUser(userId);

      if (response.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId
              ? { ...user, isBlocked: !isCurrentlyBlocked }
              : user
          )
        );
        toast.success(
          isCurrentlyBlocked
            ? "User successfully activated"
            : "User successfully blocked"
        );
      } else {
        toast.error(response.message || "Failed to update user status");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred while updating user status");
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  // Determine badge color based on role and status
  const getBadgeVariant = (role: string, isBlocked: boolean) => {
    if (isBlocked) return "error"; // Use "error" instead of "destructive"
    switch (role) {
      case "admin":
        return "default";
      case "landlord":
        return "success";
      case "tenant":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        User Management
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin mr-2 h-8 w-8 text-gray-500" />
          <p className="text-gray-500">Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="font-bold md:text-lg text-center">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role/Status</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Badge variant={getBadgeVariant(user.role, user.isBlocked)}>
                      {user.isBlocked ? "BLOCKED" : user.role.toUpperCase()}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        // variant="outline"
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleToggleUserStatus(user._id, user.isBlocked)
                        }
                        disabled={
                          user.role === "admin" || actionLoading[user._id]
                        }
                      >
                        {actionLoading[user._id] ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : user.isBlocked ? (
                          <Unlock className="mr-2 h-4 w-4" />
                        ) : (
                          <Lock className="mr-2 h-4 w-4" />
                        )}
                        {user.isBlocked ? "Activate" : "Block"}
                      </Button>
                      {/* <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user._id)}
                        disabled={
                          user.role === "admin" || actionLoading[user._id]
                        }
                      >
                        {actionLoading[user._id] ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        Delete
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UsersManagementPage;
