import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { dummyCarData, assets } from '../assets/assets';

const Car = () => {
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    type: '',
    transmission: '',
    priceRange: '',
    fuelType: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Extract unique values from car data for filter options
  const brands = [...new Set(dummyCarData.map(car => car.brand))];
  const types = [...new Set(dummyCarData.map(car => car.type))];
  const transmissions = [...new Set(dummyCarData.map(car => car.transmission))];
  const fuelTypes = [...new Set(dummyCarData.map(car => car.fuelType))];
  
  const priceRanges = [
    { label: 'Under ₱2,000/day', min: 0, max: 2000 },
    { label: '₱2,000 - ₱4,000/day', min: 2000, max: 4000 },
    { label: '₱4,000 - ₱6,000/day', min: 4000, max: 6000 },
    { label: 'Above ₱6,000/day', min: 6000, max: 999999 }
  ];

  // Fetch cars data (replace with API call)
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        // Replace this with actual API call
        // const res = await fetch("/api/cars");
        // const data = await res.json();
        // const availableCars = data.filter(car => car.available === true);
        // setCars(availableCars);
        
        // Using dummy data for now
        setTimeout(() => {
          const availableCars = dummyCarData.filter(car => car.available !== false);
          setCars(availableCars);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setCars(dummyCarData);
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);

  // Get search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setFilters(prev => ({ ...prev, search: searchQuery }));
    }
  }, [location.search]);

  // Filter cars based on current filters
  useEffect(() => {
    let filtered = cars;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(car =>
        car.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.model.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.type.toLowerCase().includes(filters.search.toLowerCase()) ||
        (car.features && car.features.join(' ').toLowerCase().includes(filters.search.toLowerCase())) ||
        car.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter(car => car.brand === filters.brand);
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(car => car.type === filters.type);
    }

    // Transmission filter
    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    // Price range filter
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        filtered = filtered.filter(car => {
          const price = parseInt(car.price || car.pricePerDay || 0);
          return price >= range.min && price <= range.max;
        });
      }
    }

    // Fuel type filter
    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }

    setFilteredCars(filtered);
  }, [filters, cars]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      brand: '',
      type: '',
      transmission: '',
      priceRange: '',
      fuelType: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>
              <p className="text-gray-600 mt-2">Browse our selection of premium vehicles available for your next adventure</p>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters {showFilters ? '▲' : '▼'}
            </button>
          </div>

          {/* Results count */}
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span>Showing {filteredCars.length} of {cars.length} cars</span>
            {filters.search && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                Search: "{filters.search}"
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search Cars</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search by make, model, features..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Car Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Car Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Transmission</label>
                <select
                  value={filters.transmission}
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">All Transmissions</option>
                  {transmissions.map(transmission => (
                    <option key={transmission} value={transmission}>{transmission}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">All Prices</option>
                  {priceRanges.map(range => (
                    <option key={range.label} value={range.label}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Fuel Type</label>
                <select
                  value={filters.fuelType}
                  onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map(fuelType => (
                    <option key={fuelType} value={fuelType}>{fuelType}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="flex-1">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car, index) => (
                  <CarCard key={car._id || index} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🚗</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600 mb-4">
                  {filters.search || filters.brand || filters.type || filters.transmission || filters.priceRange || filters.fuelType
                    ? "Try adjusting your filters or search terms"
                    : "No cars are currently available"
                  }
                </p>
                {(filters.search || filters.brand || filters.type || filters.transmission || filters.priceRange || filters.fuelType) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;