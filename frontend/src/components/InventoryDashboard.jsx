import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, Package, TrendingUp } from 'lucide-react';
import { fetchDemandPredictions, fetchInventoryAlerts, fetchRecommendations } from '../services/api';

const InventoryDashboard = () => {
  const [demandData, setDemandData] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const demandResponse = await fetchDemandPredictions();
      const alertsResponse = await fetchInventoryAlerts();
      const recommendationsResponse = await fetchRecommendations('Customer_57');

      setDemandData(demandResponse.predictions);
      setLowStockProducts(alertsResponse.alerts);
      setRecommendations(recommendationsResponse.recommendations);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Demand Prediction Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Demand Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Sales" />
                  <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <Alert key={product.id} variant="destructive">
                  <AlertDescription>
                    Low stock alert: {product.id} ({product.current}/{product.threshold} units)
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Recommendations */}
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec}
                  className="p-4 border rounded-lg bg-white shadow-sm"
                >
                  <h3 className="font-medium">{rec}</h3>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryDashboard;
