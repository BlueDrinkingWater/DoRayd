import React from "react";
import { assets } from "../assets/assets"; 

const Footer = () => {
  const navLinks = ["Home", "Browse Car", "List Your Car", "About Us"];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-white text-gray-600">

      <div className="flex flex-col md:flex-row justify-between gap-10 py-10 border-b border-gray-300/30">
 
      <div className="max-w-sm flex items-center gap-4">
      <img src={assets.logo} alt="DoRayd logo" className="h-20 md:h-24 lg:h-28" />
      <p className="text-base">
    DoRayd Travel and Tours provides quality car rental and trip booking services to satisfy your travel needs.
     </p>
      </div>


        <div>
          <h4 className="text-lg font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-base">
            {navLinks.map((link, i) => (
              <li key={i}>
                <a href="#" className="hover:underline">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">DoRayd</h4>
          <ul className="space-y-2 text-base">
            <li>📍 Malanday, Marikina, Philippines</li>
            <li>📞 +63 912 345 6789</li>
            <li>✉️ support@dorayd.com</li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center mt-6 md:mt-0 w-full md:w-auto">
          <h4 className="text-lg font-semibold mb-3 text-center">Follow Us</h4>
          <div className="flex gap-4 justify-center items-center">
            <a href="#"><img src={assets.facebook_logo} alt="Facebook" className="w-8 h-8" /></a>
            <a href="#"><img src={assets.instagram_logo} alt="Instagram" className="w-8 h-8" /></a>
            <a href="#"><img src={assets.twitter_logo} alt="Twitter" className="w-8 h-8" /></a>
            <a href="#"><img src={assets.gmail_logo || assets.gmail} alt="Gmail" className="w-8 h-8" /></a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400 py-6 border-t border-gray-200">
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
        <div>© {new Date().getFullYear()} DoRayd Travel and Tours. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
