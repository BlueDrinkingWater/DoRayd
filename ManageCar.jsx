import React, { useState } from 'react';
import { assets, dummyCarData } from '../../assets/assets';

const ManageCar = () => {
  const [cars, setCars] = useState(dummyCarData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const categories = ['All', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Pickup', 'Van'];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === '' || filterCategory === 'All' || car.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDeleteCar = (car) => {
    setCarToDelete(car);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCars(cars.filter(car => car._id !== carToDelete._id));
    setShowDeleteModal(false);
    setCarToDelete(null);
  };

  const toggleAvailability = (carId) => {
    setCars(cars.map(car => 
      car._id === carId 
        ? { ...car, isAvaliable: !car.isAvaliable }
        : car
    ));
  };

  const getAvailabilityBadge = (isAvailable) => {
    return isAvailable ? (
      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
        Available
      </span>
    ) : (
      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
        Unavailable
      </span>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Cars</h1>
        <p className="text-gray-600">
          View and manage all your listed cars
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by brand, model, or location..."
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

          {/* Category Filter */}
          <div className="md:w-48">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? '' : category}>
                  {category}
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

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div key={car._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Car Image */}
            <div className="relative h-48">
              <img 
                src={car.image} 
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                {getAvailabilityBadge(car.isAvaliable)}
              </div>
            </div>

            {/* Car Details */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-gray-500">{car.year} • {car.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">${car.pricePerDay}</p>
                  <p className="text-sm text-gray-500">per day</p>
                </div>
              </div>

              {/* Car Specs */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <img src={assets.users_icon} alt="seats" className="w-4 h-4" />
                  <span>{car.seating_capacity} seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={assets.fuel_icon} alt="fuel" className="w-4 h-4" />
                  <span>{car.fuel_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={assets.car_icon} alt="transmission" className="w-4 h-4" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={assets.location_icon} alt="location" className="w-4 h-4" />
                  <span>{car.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAvailability(car._id)}
                  className={`flex-1 px-4 py-2 rounded-lg transition ${
                    car.isAvaliable
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {car.isAvaliable ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <img src={assets.edit_icon} alt="edit" className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={() => handleDeleteCar(car)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <img src={assets.delete_icon} alt="delete" className="w-5 h-5" />
                </button>
                
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition">
                  <img src={assets.eye_icon} alt="view" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredCars.length === 0 && (
        <div className="text-center py-12">
          <img src={assets.car_icon} alt="no cars" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Car</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{carToDelete?.brand} {carToDelete?.model}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCar;