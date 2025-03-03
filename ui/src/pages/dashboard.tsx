import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Clock, 
  CreditCard, 
  User, 
  Settings, 
  LogOut, 
  Package, 
  Truck, 
  CheckCircle,
  BarChart3,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/button';

const DashboardPage: React.FC = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  // Mock order data
  const recentOrders = [
    { id: 'ORD-1234', date: '2025-05-10', status: 'Delivered', total: 78.99 },
    { id: 'ORD-1235', date: '2025-05-08', status: 'Processing', total: 124.50 },
    { id: 'ORD-1236', date: '2025-05-05', status: 'Shipped', total: 56.75 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8">My Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <div className="flex items-center">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                  <div className="ml-4">
                    <h2 className="font-semibold">{user.name}</h2>
                    <p className="text-sm text-purple-100">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <div className="space-y-1">
                  <Link to="/dashboard" className="flex items-center px-3 py-2 rounded-md bg-purple-50 text-purple-700">
                    <BarChart3 className="h-5 w-5 mr-3" />
                    Dashboard
                  </Link>
                  <Link to="/orders" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <ShoppingBag className="h-5 w-5 mr-3" />
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <Heart className="h-5 w-5 mr-3" />
                    Wishlist
                  </Link>
                  <Link to="/payment-methods" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <CreditCard className="h-5 w-5 mr-3" />
                    Payment Methods
                  </Link>
                  <Link to="/account" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <User className="h-5 w-5 mr-3" />
                    Account Details
                  </Link>
                  <Link to="/settings" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </Link>
                  <div className="pt-4 mt-4 border-t">
                    <button className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full text-left">
                      <LogOut className="h-5 w-5 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                    <p className="text-2xl font-bold">$1,248.50</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Wishlist Items</h3>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Recent Orders</h2>
                  <Link to="/orders" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    View All
                  </Link>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span 
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
