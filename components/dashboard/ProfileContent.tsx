"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Calendar, MapPin } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function ProfileContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card className="border-border-color bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={user?.name || ""}
                      className="bg-background border-border-color text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      defaultValue={user?.username || ""}
                      className="bg-background border-border-color text-foreground"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    className="bg-background border-border-color text-foreground"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      className="bg-background border-border-color text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter your location"
                      className="bg-background border-border-color text-foreground"
                    />
                  </div>
                </div>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary */}
          <div className="space-y-6">
            <Card className="border-border-color bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Account Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">
                      {user?.name || user?.username}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Member since 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">
                      Email Verified
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Last Login</p>
                    <p className="text-sm text-muted-foreground">Today</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Not specified
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-color bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="font-medium text-foreground">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Spent</span>
                  <span className="font-medium text-foreground">$419.48</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Favorite Category
                  </span>
                  <span className="font-medium text-foreground">
                    Electronics
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
