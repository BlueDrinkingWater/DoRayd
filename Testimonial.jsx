import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets"; 

const StarRating = ({ count = 5 }) => (
  <div className="flex items-center gap-1 mb-3">
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        width="20"
        height="20"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.05 0.93C7.35 0.01 8.65 0.01 8.95 0.93L10.02 4.22C10.15 4.63 10.54 4.91 10.97 4.91H14.43C15.4 4.91 15.8 6.15 15.02 6.72L12.22 8.75C11.87 9.01 11.72 9.46 11.86 9.87L12.93 13.16C13.23 14.08 12.17 14.85 11.39 14.28L8.59 12.25C8.24 11.99 7.76 11.99 7.41 12.25L4.61 14.28C3.83 14.85 2.77 14.08 3.07 13.16L4.14 9.87C4.28 9.46 4.13 9.01 3.78 8.75L0.98 6.72C0.2 6.15 0.6 4.91 1.57 4.91H5.03C5.46 4.91 5.85 4.63 5.98 4.22L7.05 0.93Z"
          fill="#5044E5"
        />
      </svg>
    ))}
  </div>
);

const testimonials = [
  {
    name: "DilDho",
    location: "Manila, Philippines",
    image: assets.testimonial_image_1,
    testimonial: "Very Good Service",
  },
  {
    name: "Can Thought",
    location: "Puerto Princesa, Philippines",
    image: assets.testimonial_image_2,
    testimonial: "Very Good Service",
  },
  {
    name: "Phuke Rat",
    location: "Cubao, Philippines",
    image: assets.testimonial_image_2,
    testimonial: "Very Good Service",
  },
];

const Testimonial = () => {
  return (
    <div className="px-6 sm:px-24 xl:px-40 py-28">
      <Title
        title="What Our Customer Says About Us?"
        subTitle="Discover something that will ease your travel concerns"
      />
      <div className="text-center mb-12">
        <h2 className="text-slate-700 text-4xl md:text-[48px] font-bold">
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="p-10 rounded-2xl bg-[#FDFDFE] shadow-xl border hover:-translate-y-1 transition"
          >
            <StarRating />
            <p className="text-gray-600 text-lg mb-6">"{item.testimonial}"</p>
            <hr className="mb-5 border-gray-300" />
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-700">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
