// inventory-ai-frontend/src/components/InventoryDashboard.jsx

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Alert } from "@/components/ui/alert";
import { Bell, Package, TrendingUp } from "lucide-react";
import axios from 'axios';

const InventoryDashboard = () => {
  const [demandData, setDemandData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Fetch demand predictions
  useEffect(() => {
    axios.get('http://localhost:8000/api/predictions/demand')
      .then(response => {
        setDemandData(response.data.predictions);
      })
      .catch(error => {
        console.error("Error fetching demand predictions:", error);
      });
  }, []);

  // Fetch inventory alerts
  useEffect(() => {
    axios.get('http://localhost:8000/api/alerts/inventory')
      .then(response => {
        setAlerts(response.data.alerts);
      })
      .catch(error => {
        console.error("Error fetching inventory alerts:", error);
      });
  }, []);

  // Fetch smart recommendations
  useEffect(() => {
    axios.get('http://localhost:8000/api/recommendations/12345')  // Replace with actual user_id
      .then(response => {
        setRecommendations(response.data.recommendations);
      })
      .catch(error => {
        console.error("Error fetching recommendations:", error);
      });
  }, []);

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
            <LineChart data={demandData}>
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
            {alerts.map((alert, index) => (
              <Alert key={index} type="danger">
                Low stock alert: {alert.name} ({alert.units}/{alert.total_units} units)
              </Alert>
            ))}
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
            {recommendations.map((rec, index) => (
              <div key={index}>
                <div>{rec.product_name}</div>
                <div>Confidence: {rec.confidence}%</div>
                <br />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryDashboard;
