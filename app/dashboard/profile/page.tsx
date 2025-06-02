"use client";

import { ProfileContent } from "@/components/dashboard/ProfileContent";
import { withAuth } from "@/lib/auth";

function ProfilePage() {
  return <ProfileContent />;
}

export default withAuth(ProfilePage);
