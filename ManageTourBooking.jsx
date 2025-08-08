import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';

// Dummy tour bookings data
const dummyTourBookings = [
  {
    _id: '64f7b8a9c3e4f5a6b7c8d9f0',
    tourPackage: {
      _id: '64f7b8a9c3e4f5a6b7c8d9e0',
      title: 'Bohol Island Adventure',
      destination: 'Bohol, Philippines',
      duration: 3,
      price: 299,
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=250&fit=crop'
    },
    customerName: 'Maria Santos',
    customerEmail: 'maria@example.com',
    customerPhone: '+63 917 123 4567',
    groupSize: 4,
    bookingDate: '2024-08-10',
    tourDate: '2024-08-25',
    totalPrice: 1196,
    status: 'confirmed',
    specialRequests: 'Vegetarian meals for 2 people',
    paymentStatus: 'paid'
  },
  {
    _id: '64f7b8a9c3e4f5a6b7c8d9f1',
    tourPackage: {
      _id: '64f7b8a9c3e4f5a6b7c8d9e1',
      title: 'Palawan Underground River',
      destination: 'Puerto Princesa, Palawan',
      duration: 2,
      price: 199,
      category: 'Nature',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop'
    },
    customerName: 'John Cruz',
    customerEmail: 'john@example.com',
    customerPhone: '+63 905 987 6543',
    groupSize: 2,
    bookingDate: '2024-08-12',
    tourDate: '2024-09-01',
    totalPrice: 398,
    status: 'pending',
    specialRequests: 'Pick up from hotel',
    paymentStatus: 'pending'
  },
  {
    _id: '64f7b8a9c3e4f5a6b7c8d9f2',
    tourPackage: {
      _id: '64f7b8a9c3e4f5a6b7c8d9e3',
      title: 'Siargao Surfing Experience',
      destination: 'Siargao Island',
      duration: 5,
      price: 499,
      category: 'Water Sports',
      image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=250&fit=crop'
    },
    customerName: 'Lisa Wang',
    customerEmail: 'lisa@example.com',
    customerPhone: '+63 928 456 7890',
    groupSize: 1,
    bookingDate: '2024-07-20',
    tourDate: '2024-08-05',
    totalPrice: 499,
    status: 'completed',
    specialRequests: 'Beginner surfer - need basic lessons',
    paymentStatus: 'paid'
  },
  {
    _id: '64f7b8a9c3e4f5a6b7c8d9f3',
    tourPackage: {
      _id: '64f7b8a9c3e4f5a6b7c8d9e2',
      title: 'Sagada Cave & Rice Terraces',
      destination: 'Sagada, Mountain Province',
      duration: 4,
      price: 399,
      category: 'Cultural',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop'
    },
    customerName: 'Robert Kim',
    customerEmail: 'robert@example.com',
    customerPhone: '+63 912 345 6789',
    groupSize: 3,
    bookingDate: '2024-08-15',
    tourDate: '2024-09-10',
    totalPrice: 1197,
    status: 'cancelled',
    specialRequests: 'Need wheelchair accessible accommodation',
    paymentStatus: 'refunded'
  }
];

const ManageTourBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setBookings(dummyTourBookings);
      setLoading(false);
    }, 500);
  }, []);

  const statusOptions = ['All', 'pending', 'confirmed', 'completed', 'cancelled'];

  const filteredBookings = bookings.filter(booking => {
    if (!booking || !booking.tourPackage) return false;
    
    const matchesSearch = booking.tourPackage.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking._id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === '' || filterStatus === 'All' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPaymentBadge = (paymentStatus) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (paymentStatus) {
      case 'paid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'refunded':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(bookings.map(booking => 
      booking._id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Tour Bookings</h1>
        <p className="text-gray-600">
          View and manage all customer tour bookings
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading bookings...</p>
        </div>
      ) : (
        <>
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by tour, customer, booking ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <img 
                    src={assets.search_icon} 
                    alt="search" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="md:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status === 'All' ? '' : status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Icon */}
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <img src={assets.filter_icon} alt="filter" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bookings List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tour Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Group Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tour Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{booking._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            src={booking.tourPackage.image} 
                            alt={booking.tourPackage.title}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.tourPackage.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.tourPackage.destination}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                        <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.groupSize} {booking.groupSize === 1 ? 'person' : 'people'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.tourDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${booking.totalPrice}</div>
                        <span className={getPaymentBadge(booking.paymentStatus)}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => viewBookingDetails(booking)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <img src={assets.eye_icon} alt="view" className="w-4 h-4" />
                          </button>
                          
                          {booking.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                              >
                                <img src={assets.check_icon} alt="confirm" className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              >
                                <img src={assets.close_icon} alt="cancel" className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          
                          {booking.status === 'confirmed' && (
                            <button 
                              onClick={() => updateBookingStatus(booking._id, 'completed')}
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <img src={assets.tick_icon} alt="complete" className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* No Results */}
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <img src={assets.listIcon} alt="no bookings" className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tour bookings found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Booking Details Modal */}
          {showDetailsModal && selectedBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Tour Booking Details</h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <img src={assets.close_icon} alt="close" className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Booking Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Booking Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Booking ID:</span>
                        <p className="font-medium">#{selectedBooking._id.slice(-8)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <div className="mt-1">
                          <span className={getStatusBadge(selectedBooking.status)}>
                            {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Booking Date:</span>
                        <p className="font-medium">{formatDate(selectedBooking.bookingDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Tour Date:</span>
                        <p className="font-medium">{formatDate(selectedBooking.tourDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Group Size:</span>
                        <p className="font-medium">{selectedBooking.groupSize} {selectedBooking.groupSize === 1 ? 'person' : 'people'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Price:</span>
                        <p className="font-medium text-lg">${selectedBooking.totalPrice}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Status:</span>
                        <div className="mt-1">
                          <span className={getPaymentBadge(selectedBooking.paymentStatus)}>
                            {selectedBooking.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <p className="font-medium">{selectedBooking.customerName}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <p className="font-medium">{selectedBooking.customerEmail}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <p className="font-medium">{selectedBooking.customerPhone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tour Package Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Tour Package Details</h4>
                    <div className="flex gap-4">
                      <img 
                        src={selectedBooking.tourPackage.image} 
                        alt={selectedBooking.tourPackage.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-lg">{selectedBooking.tourPackage.title}</h5>
                        <p className="text-gray-600">{selectedBooking.tourPackage.destination}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                          <div>{selectedBooking.tourPackage.duration} days</div>
                          <div>{selectedBooking.tourPackage.category}</div>
                          <div>${selectedBooking.tourPackage.price} per person</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {selectedBooking.specialRequests && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Special Requests</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">{selectedBooking.specialRequests}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4 border-t">
                    {selectedBooking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            updateBookingStatus(selectedBooking._id, 'confirmed');
                            setShowDetailsModal(false);
                          }}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          Confirm Booking
                        </button>
                        <button
                          onClick={() => {
                            updateBookingStatus(selectedBooking._id, 'cancelled');
                            setShowDetailsModal(false);
                          }}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                          Cancel Booking
                        </button>
                      </>
                    )}
                    
                    {selectedBooking.status === 'confirmed' && (
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking._id, 'completed');
                          setShowDetailsModal(false);
                        }}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageTourBooking;