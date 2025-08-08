import React, { useState } from 'react';
import { assets } from '../../assets/assets';

// Dummy tour packages data
const dummyTourPackages = [
  {
    _id: '64f7b8a9c3e4f5a6b7c8d9e0',
    title: 'Bohol Island Adventure',
    destination: 'Bohol, Philippines',
    duration: 3,
    price: 299,
    category: 'Adventure',
    maxGroupSize: 15,
    difficulty: 'Moderate',
    rating: 4.8,
    reviewCount: 124,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=250&fit=crop',
    description: 'Explore the famous Chocolate Hills, see the tarsiers, and enjoy river cruising.',
    inclusions: ['Transportation', 'Tour Guide', 'Entrance Fees', 'Lunch']
  },
  {
    _id: '64f7b8a9c3e4f5a6b7c8d9e1',
    title: 'Palawan Underground River',
    destination: 'Puerto Princesa, Palawan',
    duration: 2,
    price: 199,
    category: 'Nature',
    maxGroupSize: 12,
    difficulty: 'Easy',
    rating: 4.9,
    reviewCount: 89,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop',
    description: 'Discover the UNESCO World Heritage Site - Puerto Princesa Underground River.',
    inclusions: ['Round-trip transfer', 'Boat ride', 'Audio guide', 'Environmental fee']
  },
  {
    _id: '64f7b8a9c3e4f5a6b7c8d9e2',
    title: 'Sagada Cave & Rice Terraces',
    destination: 'Sagada, Mountain Province',
    duration: 4,
    price: 399,
    category: 'Cultural',
    maxGroupSize: 10,
    difficulty: 'Challenging',
    rating: 4.7,
    reviewCount: 76,
    isAvailable: false,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
    description: 'Experience the mystical caves and ancient rice terraces of the Cordilleras.',
    inclusions: ['Accommodation', 'All meals', 'Cave guide', 'Transportation']
  },
  {
    _id: '64f7b8a9c3e4f5a6b7c8d9e3',
    title: 'Siargao Surfing Experience',
    destination: 'Siargao Island',
    duration: 5,
    price: 499,
    category: 'Water Sports',
    maxGroupSize: 8,
    difficulty: 'Moderate',
    rating: 4.6,
    reviewCount: 92,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=250&fit=crop',
    description: 'Learn to surf in the surfing capital of the Philippines with professional instructors.',
    inclusions: ['Surfboard rental', 'Surf lessons', 'Island hopping', 'Beach accommodation']
  }
];

const ManageTourPackage = () => {
  const [tourPackages, setTourPackages] = useState(dummyTourPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  const categories = ['All', 'Adventure', 'Nature', 'Cultural', 'Water Sports', 'City Tour', 'Food Tour', 'Historical'];

  const filteredPackages = tourPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === '' || filterCategory === 'All' || pkg.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDeletePackage = (pkg) => {
    setPackageToDelete(pkg);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setTourPackages(tourPackages.filter(pkg => pkg._id !== packageToDelete._id));
    setShowDeleteModal(false);
    setPackageToDelete(null);
  };

  const toggleAvailability = (packageId) => {
    setTourPackages(tourPackages.map(pkg => 
      pkg._id === packageId 
        ? { ...pkg, isAvailable: !pkg.isAvailable }
        : pkg
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

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      'Easy': 'bg-green-100 text-green-800',
      'Moderate': 'bg-yellow-100 text-yellow-800',
      'Challenging': 'bg-orange-100 text-orange-800',
      'Expert': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 ${colors[difficulty] || 'bg-gray-100 text-gray-800'} rounded-full text-xs font-medium`;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Tour Packages</h1>
        <p className="text-gray-600">
          View and manage all your tour packages
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
                placeholder="Search by title, destination, or category..."
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

      {/* Tour Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div key={pkg._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Package Image */}
            <div className="relative h-48">
              <img 
                src={pkg.image} 
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                {getAvailabilityBadge(pkg.isAvailable)}
              </div>
              <div className="absolute top-4 right-4">
                <span className={getDifficultyBadge(pkg.difficulty)}>
                  {pkg.difficulty}
                </span>
              </div>
            </div>

            {/* Package Details */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">{pkg.destination}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <img src={assets.star_icon} alt="rating" className="w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700">{pkg.rating}</span>
                    <span className="text-sm text-gray-500">({pkg.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">${pkg.price}</p>
                  <p className="text-sm text-gray-500">per person</p>
                </div>
              </div>

              {/* Package Specs */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <img src={assets.calendar_icon} alt="duration" className="w-4 h-4" />
                  <span>{pkg.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={assets.users_icon} alt="group size" className="w-4 h-4" />
                  <span>Max {pkg.maxGroupSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={assets.tag_icon} alt="category" className="w-4 h-4" />
                  <span>{pkg.category}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {pkg.description}
              </p>

              {/* Inclusions */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Inclusions:</p>
                <div className="flex flex-wrap gap-1">
                  {pkg.inclusions.slice(0, 3).map((inclusion, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {inclusion}
                    </span>
                  ))}
                  {pkg.inclusions.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{pkg.inclusions.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAvailability(pkg._id)}
                  className={`flex-1 px-4 py-2 rounded-lg transition ${
                    pkg.isAvailable
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {pkg.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <img src={assets.edit_icon} alt="edit" className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={() => handleDeletePackage(pkg)}
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
      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <img src={assets.location_icon} alt="no packages" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tour packages found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Tour Package</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{packageToDelete?.title}</strong>? 
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

export default ManageTourPackage;