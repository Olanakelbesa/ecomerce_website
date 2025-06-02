"use client";

import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { withAuth } from "@/lib/auth";

function DashboardPage() {
  return <DashboardContent />;
}

export default withAuth(DashboardPage);
