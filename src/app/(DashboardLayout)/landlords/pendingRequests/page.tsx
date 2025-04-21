import PendingTenantRequests from "@/app/(MainLayout)/landlord/requests/pending/page";

const pendingRequestsPage = () => {
  return (
    <div className="text-xl text-center font-semibold">
      <h1>Pending Requests</h1>
      <PendingTenantRequests />
    </div>
  );
};

export default pendingRequestsPage;
