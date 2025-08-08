import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TourCard from '../components/TourCard';
import { assets } from '../assets/assets';

// Dummy tour data - you can move this to your assets.js file
const dummyTourData = [
  {
    _id: 'tour1',
    title: 'Bohol Countryside Adventure',
    destination: 'Bohol, Philippines',
    duration: '3 Days 2 Nights',
    price: '8500',
    category: 'Adventure',
    groupSize: '15',
    difficulty: 'Moderate',
    rating: 4.8,
    reviewCount: 142,
    available: true,
    image: '/api/placeholder/400/300',
    description: 'Explore the beautiful countryside of Bohol with visits to Chocolate Hills, tarsier sanctuary, and historic sites.'
  },
  {
    _id: 'tour2',
    title: 'Palawan Island Hopping',
    destination: 'El Nido, Palawan',
    duration: '4 Days 3 Nights',
    price: '12000',
    category: 'Water Sports',
    groupSize: '12',
    difficulty: 'Easy',
    rating: 4.9,
    reviewCount: 89,
    available: true,
    image: '/api/placeholder/400/300',
    description: 'Experience pristine beaches, crystal clear waters, and stunning limestone cliffs in El Nido.'
  },
  {
    _id: 'tour3',
    title: 'Mt. Pulag Hiking Expedition',
    destination: 'Benguet, Philippines',
    duration: '2 Days 1 Night',
    price: '3500',
    category: 'Mountain',
    groupSize: '20',
    difficulty: 'Challenging',
    rating: 4.6,
    reviewCount: 76,
    available: true,
    image: '/api/placeholder/400/300',
    description: 'Conquer the third highest peak in the Philippines and witness the famous sea of clouds.'
  },
  {
    _id: 'tour4',
    title: 'Cebu City Heritage Walk',
    destination: 'Cebu City, Philippines',
    duration: '1 Day',
    price: '1200',
    category: 'Cultural',
    groupSize: '25',
    difficulty: 'Easy',
    rating: 4.5,
    reviewCount: 134,
    available: true,
    image: '/api/placeholder/400/300',
    description: 'Discover the rich history and culture of Cebu through its historic landmarks and heritage sites.'
  },
  {
    _id: 'tour5',
    title: 'Batanes Photography Tour',
    destination: 'Batanes, Philippines',
    duration: '5 Days 4 Nights',
    price: '18000',
    category: 'Nature',
    groupSize: '8',
    difficulty: 'Moderate',
    rating: 4.9,
    reviewCount: 43,
    available: true,
    image: '/api/placeholder/400/300',
    description: 'Capture the breathtaking landscapes of the northernmost province of the Philippines.'
  },
  {
    _id: 'tour6',
    title: 'Manila Food Crawl',
    destination: 'Manila, Philippines',
    duration: '6 Hours',
    price: '2500',
    category: 'Food & Culinary',
    groupSize: '15',
    difficulty: 'Easy',
    rating: 4.7,
    reviewCount: 98,
    available: true,
    image: '/api/placeholder/400/300',
    description: 'Taste the best Filipino cuisine in the heart of Manila with local food experts.'
  },
  {
    _id: 'tour7',
    title: 'Siargao Surfing Experience',
    destination: 'Siargao, Philippines',
    duration: '4 Days 3 Nights',
    price: '9500',
    category: 'Water Sports',
    groupSize: '10',
    difficulty: 'Moderate',
    rating: 4.8,
    reviewCount: 67,
    available: true,
    image: '/api/placeholder/400/300',
    description: 'Learn to surf or improve your skills in the surfing capital of the Philippines.'
  },
  {
    _id: 'tour8',
    title: 'Intramuros Night Tour',
    destination: 'Manila, Philippines',
    duration: '4 Hours',
    price: '1800',
    category: 'Cultural',
    groupSize: '20',
    difficulty: 'Easy',
    rating: 4.4,
    reviewCount: 156,
    available: true,
    image: '/api/placeholder/400/300',
    description: 'Explore the historic walled city of Manila under the romantic glow of night lights.'
  },
  {
    _id: 'tour9',
    title: 'Coron Adventure Package',
    destination: 'Coron, Palawan',
    duration: '3 Days 2 Nights',
    price: '11000',
    category: 'Adventure',
    groupSize: '14',
    difficulty: 'Moderate',
    rating: 4.7,
    reviewCount: 112,
    available: true,
    image: '/api/placeholder/400/300',
    description: 'Dive into crystal clear lakes, explore Japanese shipwrecks, and enjoy pristine beaches.'
  },
  {
    _id: 'tour10',
    title: 'Vigan Heritage City Tour',
    destination: 'Vigan, Ilocos Sur',
    duration: '2 Days 1 Night',
    price: '4500',
    category: 'Cultural',
    groupSize: '18',
    difficulty: 'Easy',
    rating: 4.6,
    reviewCount: 88,
    available: true,
    image: '/api/placeholder/400/300',
    description: 'Step back in time and experience the Spanish colonial charm of Vigan City.'
  }
];

const Tours = () => {
  const location = useLocation();
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    difficulty: '',
    priceRange: '',
    destination: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = ['Adventure', 'Nature', 'Cultural', 'Water Sports', 'Mountain', 'Beach', 'Wildlife', 'City Tour', 'Food & Culinary', 'Religious'];
  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Extreme'];
  const priceRanges = [
    { label: 'Under ₱5,000', min: 0, max: 5000 },
    { label: '₱5,000 - ₱10,000', min: 5000, max: 10000 },
    { label: '₱10,000 - ₱15,000', min: 10000, max: 15000 },
    { label: 'Above ₱15,000', min: 15000, max: 999999 }
  ];

  // Fetch tours data (replace with API call)
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        // Replace this with actual API call
        // const res = await fetch("/api/tours");
        // const data = await res.json();
        // const availableTours = data.filter(tour => tour.available === true);
        // setTours(availableTours);
        
        // Using dummy data for now
        setTimeout(() => {
          const availableTours = dummyTourData.filter(tour => tour.available === true);
          setTours(availableTours);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setTours(dummyTourData);
        setLoading(false);
      }
    };
    
    fetchTours();
  }, []);

  // Get search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setFilters(prev => ({ ...prev, search: searchQuery }));
    }
  }, [location.search]);

  // Filter tours based on current filters
  useEffect(() => {
    let filtered = tours;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        tour.destination.toLowerCase().includes(filters.search.toLowerCase()) ||
        tour.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        tour.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(tour => tour.category === filters.category);
    }

    // Difficulty filter
    if (filters.difficulty) {
      filtered = filtered.filter(tour => tour.difficulty === filters.difficulty);
    }

    // Price range filter
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        filtered = filtered.filter(tour => {
          const price = parseInt(tour.price);
          return price >= range.min && price <= range.max;
        });
      }
    }

    // Destination filter
    if (filters.destination) {
      filtered = filtered.filter(tour =>
        tour.destination.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }

    setFilteredTours(filtered);
  }, [filters, tours]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      difficulty: '',
      priceRange: '',
      destination: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tours...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Tour Packages</h1>
              <p className="text-gray-600 mt-2">Discover amazing destinations and unforgettable experiences</p>
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
            <span>Showing {filteredTours.length} of {tours.length} tour packages</span>
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
                <label className="block text-sm font-medium mb-2">Search Tours</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search by title, destination..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">All Difficulties</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
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

              {/* Destination */}
              <div>
                <label className="block text-sm font-medium mb-2">Destination</label>
                <input
                  type="text"
                  value={filters.destination}
                  onChange={(e) => handleFilterChange('destination', e.target.value)}
                  placeholder="Enter destination..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Tours Grid */}
          <div className="flex-1">
            {filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map(tour => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏝️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
                <p className="text-gray-600 mb-4">
                  {filters.search || filters.category || filters.difficulty || filters.priceRange || filters.destination
                    ? "Try adjusting your filters or search terms"
                    : "No tours are currently available"
                  }
                </p>
                {(filters.search || filters.category || filters.difficulty || filters.priceRange || filters.destination) && (
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

export default Tours;