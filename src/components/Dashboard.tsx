// src/components/Dashboard.tsx
import React, { useState } from "react";
import Profile from "./Profile";
import OrderHistory from "./OrderHistory";

interface DashboardProps {
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {userName}!</h1>
        <div className="flex flex-col md:flex-row">
          {/* Side Navigation with keyboard accessibility */}
          <aside className="md:w-1/4 bg-white shadow-md p-4 rounded mr-0 md:mr-4 mb-4 md:mb-0">
            <ul>
              <li
                onClick={() => setActiveTab("profile")}
                className={`cursor-pointer p-2 hover:bg-green-100 transition ${
                  activeTab === "profile" ? "bg-green-100" : ""
                }`}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") setActiveTab("profile");
                }}
              >
                Profile Information
              </li>
              <li
                onClick={() => setActiveTab("orders")}
                className={`cursor-pointer p-2 hover:bg-green-100 transition ${
                  activeTab === "orders" ? "bg-green-100" : ""
                }`}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") setActiveTab("orders");
                }}
              >
                Order History
              </li>
              <li className="cursor-pointer p-2 hover:bg-green-100 transition">
                Account Settings
              </li>
              <li className="cursor-pointer p-2 hover:bg-green-100 transition">
                Support / Help
              </li>
            </ul>
          </aside>
          {/* Main Content Area */}
          <main className="flex-1 bg-white shadow-md p-4 rounded transition">
            {activeTab === "profile" ? <Profile /> : <OrderHistory />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
