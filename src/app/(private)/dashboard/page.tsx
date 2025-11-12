"use client"
import useStatus from "@/hooks/useStatus"
import { BarChart3, TrendingUp, Users } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const COLORS = ["#3b82f6", "#ef4444"];

export default function Dashboard() {

  const { data, isLoading } = useStatus();


  return (
 <div>
  <div className="w-full h-80 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-3">
      <TrendingUp size={18} className="text-gray-700" /> Monthly Performance
    </h2>

    {isLoading ? (
      <div className="h-64 w-full bg-gray-100 rounded-lg animate-pulse" />
    ) : (
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data?.lastMonth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} />
          <Line type="monotone" dataKey="totalRevenue" name="Revenue" stroke="#ef4444" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="totalBookings" name="Bookings" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="averageBookingValue" name="Avg Value" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    )}
  </div>

  <div className="space-y-6 mt-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full h-80 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-3">
          <BarChart3 size={18} className="text-gray-700" /> Bookings Per Month
        </h2>
        {isLoading ? (
          <div className="h-64 w-full bg-gray-100 rounded-lg animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data?.bookingsTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="count" name="Total Bookings" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="w-full h-80 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-3">
          <Users size={18} className="text-gray-700" /> User Roles Overview
        </h2>
        {isLoading ? (
          <div className="h-64 w-full bg-gray-100 rounded-full animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data?.users}
                dataKey="count"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
              >
                {data?.users.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  </div>
</div>
  )
}