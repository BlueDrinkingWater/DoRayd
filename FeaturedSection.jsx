import React, { useState } from 'react';
import { dummyCarData, arrow_icon } from '../assets/assets';
import Title from './Title';
import CarCard from './CarCard';
import TourCard from './TourCard';
import { useNavigate } from 'react-router-dom';

// Dummy tour data - you can move this to your assets file
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
    image: '/api/placeholder/400/300'
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
    image: '/api/placeholder/400/300'
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
    image: '/api/placeholder/400/300'
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
    image: '/api/placeholder/400/300'
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
    image: '/api/placeholder/400/300'
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
    image: '/api/placeholder/400/300'
  }
];

const FeaturedSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cars'); // 'cars' or 'tours'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleViewAll = () => {
    if (activeTab === 'cars') {
      navigate('/cars');
    } else {
      navigate('/tours');
    }
    scrollTo(0, 0);
  };

  return (
    <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className="text-center">
        <Title 
          title='Featured Services' 
          subTitle='Explore our exclusive collection of luxury cars and amazing tour packages.'
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center bg-gray-100 rounded-lg p-1 mt-8">
        <button
          onClick={() => handleTabChange('cars')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === 'cars'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Cars
        </button>
        <button
          onClick={() => handleTabChange('tours')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === 'tours'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Tours
        </button>
      </div>

      {/* Content Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full'>
        {activeTab === 'cars' 
          ? dummyCarData.slice(0, 6).map((car) => (
              <div key={car._id}>
                <CarCard car={car} />
              </div>
            ))
          : dummyTourData.slice(0, 6).map((tour) => (
              <div key={tour._id}>
                <TourCard tour={tour} />
              </div>
            ))
        }
      </div>

      {/* View All Button */}
      <button 
        onClick={handleViewAll}
        className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-16 cursor-pointer transition-all'
      >
        {activeTab === 'cars' ? 'Explore all cars' : 'Explore all tours'} 
        <img src={arrow_icon} alt="arrow" />
      </button>
      
    </div>
  );
};

export default FeaturedSection;