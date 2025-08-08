import React from "react";
import { assets } from '../assets/assets';

const Banner = () => {  
    return (
        <div className='flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden'>  

        <div className='text-white'> 
            <h2 className='text-3xl font-medium'> Do you Own a Car?</h2>
            <p className='mt-2'>List it on our platform and earn money!</p>

            <button className='px-6 py-2 bg-blue-400 hover:bg-blue-600 transition-all text-white rounded-lg text-sm mt-4 cursor-pointer'>Get Started</button>

        </div>

        <img src={assets.banner_car_image} alt="car" className='max-h-45 mt-10'/>



        </div>
    )
}

export default Banner;