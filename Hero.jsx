import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";

const Hero = () => {

  const [pickupLocation, setPickupLocation] = useState('');
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
      
      <h1 className='text-3xl md:text-4xl font-semibold'>DoRayd Travel and Tours </h1>
      
      <form className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-1g md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
        
        <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8 w-full'>
          <div className='flex flex-col gap-2'>
            <select required  value={pickupLocation} onChange ={(e) => setPickupLocation(e.target.value)}>
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>{city} </option>
              ))}
            </select>
            <p className='px-1 text-xs text-gray-500'>{pickupLocation ? pickupLocation :  'Please select location'}</p>
          </div>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='pickup-date' className='text-xs md:text-sm'> Pick-up Date </label>
              <input type="date" id='pickup-date' min={new Date().toISOString().split('T')[0]} className='text-xs md:text-sm border border-gray-300 rounded-md p-2'  required/>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='return-date' className='text-xs md:text-sm'> Return Date </label>
            <input type="date" id='return-date' className='text-xs md:text-sm border border-gray-300 rounded-md p-2'  required/>
          </div>
        </div>
        <div className="flex justify-center w-full mt-6 md:mt-0">
          <button
            type="search"
            className='flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg cursor-pointer transition-all duration-200 text-base md:text-lg'
            style={{ minWidth: 90, minHeight: 36, fontSize: 16 }}
          > 
            seach
          </button>
        </div>
      </form>
      <img src={assets.main_car} alt="car" className='max-h-74'/>
    </div>
  );
};

export default Hero;