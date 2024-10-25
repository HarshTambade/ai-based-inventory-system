import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Alert } from "@/components/ui/alert";
import { Bell, Package, TrendingUp } from "lucide-react";

// Sample Data for Chart
const data = [
  { month: 'Jan', actualSales: 220, predictedSales: 210 },
  { month: 'Feb', actualSales: 200, predictedSales: 190 },
  { month: 'Mar', actualSales: 180, predictedSales: 175 },
  { month: 'Apr', actualSales: 210, predictedSales: 205 },
];

const InventoryDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Inventory AI Platform</h1>

      {/* Line Chart for Demand Forecast */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Demand Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actualSales" stroke="#8884d8" />
              <Line type="monotone" dataKey="predictedSales" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Stock Alerts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>
              <Bell className="inline mr-2" /> Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert type="danger">
              Low stock alert: Soap (15/50 units)
            </Alert>
            <Alert type="danger">
              Low stock alert: Perfume (8/30 units)
            </Alert>
          </CardContent>
        </Card>

        {/* Smart Recommendations */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>
              <Package className="inline mr-2" /> Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>Vitamin Supplements</div>
            <div>Confidence: 89.0%</div>
            <br />
            <div>Protein Shake</div>
            <div>Confidence: 75.0%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryDashboard;
