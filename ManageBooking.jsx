import React, { useState, useEffect } from 'react';
import { assets, dummyMyBookingsData } from '../../assets/assets';

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setBookings(dummyMyBookingsData);
      setLoading(false);
    }, 500);
  }, []);

  const statusOptions = ['All', 'pending', 'confirmed', 'completed', 'cancelled'];

  const filteredBookings = bookings.filter(booking => {
    if (!booking || !booking.car) return false;
    
    const matchesSearch = booking.car.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDuration = (pickupDate, returnDate) => {
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const diffTime = Math.abs(returnD - pickup);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays;
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Bookings</h1>
        <p className="text-gray-600">
          View and manage all customer bookings for your cars
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
                    placeholder="Search by car, booking ID..."
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
                      Car
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
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
                            src={booking.car.image} 
                            alt={`${booking.car.brand} ${booking.car.model}`}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.car.brand} {booking.car.model}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.car.year}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{formatDate(booking.pickupDate)}</div>
                          <div className="text-gray-500">to {formatDate(booking.returnDate)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {calculateDuration(booking.pickupDate, booking.returnDate)} day(s)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${booking.price}
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Booking Details Modal */}
          {showDetailsModal && selectedBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
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
                        <span className="text-gray-500">Pickup Date:</span>
                        <p className="font-medium">{formatDate(selectedBooking.pickupDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Return Date:</span>
                        <p className="font-medium">{formatDate(selectedBooking.returnDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <p className="font-medium">{calculateDuration(selectedBooking.pickupDate, selectedBooking.returnDate)} day(s)</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Price:</span>
                        <p className="font-medium text-lg">${selectedBooking.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Car Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Car Details</h4>
                    <div className="flex gap-4">
                      <img 
                        src={selectedBooking.car.image} 
                        alt={`${selectedBooking.car.brand} ${selectedBooking.car.model}`}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-lg">{selectedBooking.car.brand} {selectedBooking.car.model}</h5>
                        <p className="text-gray-600">{selectedBooking.car.year} • {selectedBooking.car.category}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                          <div>{selectedBooking.car.seating_capacity} seats</div>
                          <div>{selectedBooking.car.fuel_type}</div>
                          <div>{selectedBooking.car.transmission}</div>
                          <div>{selectedBooking.car.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>

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

export default ManageBooking;