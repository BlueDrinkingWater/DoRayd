import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';

const TourCard = ({ tour }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tours/${tour._id}`);
  };

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'challenging':
        return 'bg-orange-500';
      case 'extreme':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Helper function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">☆</span>
      );
    }

    return stars;
  };

  return (
    <div
      onClick={handleCardClick}
      className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer'
    >
      <div className='relative h-48 overflow-hidden'>
        <img
          src={tour.image || tour.images?.[0]}
          alt="Tour Image"
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />

        {tour.available && (
          <p className='absolute top-4 left-4 bg-green-500/90 text-white text-xs px-2.5 py-1 rounded'>
            Available
          </p>
        )}

        {/* Difficulty Badge */}
        {tour.difficulty && (
          <p className={`absolute top-4 right-4 ${getDifficultyColor(tour.difficulty)} text-white text-xs px-2.5 py-1 rounded`}>
            {tour.difficulty}
          </p>
        )}

        <div className='absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg'>
          <span className='font-semibold'>{currency}{tour.price}</span>
          <span className='text-sm text-white/80'>/ person</span>
        </div>
      </div>

      <div className='p-4 sm:p-5'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='text-lg font-medium line-clamp-1'>{tour.title}</h3>
          <p className='text-muted-foreground text-sm'>{tour.category}</p>
        </div>

        {/* Destination */}
        <p className='text-sm text-gray-600 mb-3 line-clamp-1'>
          📍 {tour.destination}
        </p>

        {/* Rating */}
        {tour.rating && (
          <div className='flex items-center gap-2 mb-3'>
            <div className='flex'>
              {renderStars(tour.rating)}
            </div>
            <span className='text-sm text-gray-600'>
              ({tour.reviewCount || 0} reviews)
            </span>
          </div>
        )}

        <div className='grid grid-cols-2 gap-y-3 gap-x-6 text-gray-600'>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.user_icon} alt="" className='h-4 mr-2' />
            <span>Max {tour.groupSize || tour.maxGroupSize}</span>
          </div>

          <div className='flex items-center text-sm text-muted-foreground'>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tour.duration}</span>
          </div>

          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.location_icon} alt="" className='h-4 mr-2' />
            <span className='line-clamp-1'>{tour.destination}</span>
          </div>

          <div className='flex items-center text-sm text-muted-foreground'>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3h-1m-1-6V9a5 5 0 00-10 0v6m0 0V9a3 3 0 013-3h4a3 3 0 013 3v6" />
            </svg>
            <span>{tour.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;