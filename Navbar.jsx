import React, { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Login";

const Navbar = ({ setShowLogin, setShowSignup }) => {
  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Tours", path: "/tours" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [toursData, setToursData] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  // Dummy tour data - replace with API call
  const dummyTourData = [
    {
      _id: 'tour1',
      title: 'Bohol Countryside Adventure',
      destination: 'Bohol, Philippines',
      duration: '3 Days 2 Nights',
      price: '8500',
      category: 'Adventure',
    },
    {
      _id: 'tour2',
      title: 'Palawan Island Hopping',
      destination: 'El Nido, Palawan',
      duration: '4 Days 3 Nights',
      price: '12000',
      category: 'Water Sports',
    },
    {
      _id: 'tour3',
      title: 'Mt. Pulag Hiking Expedition',
      destination: 'Benguet, Philippines',
      duration: '2 Days 1 Night',
      price: '3500',
      category: 'Mountain',
    },
    {
      _id: 'tour4',
      title: 'Cebu City Heritage Walk',
      destination: 'Cebu City, Philippines',
      duration: '1 Day',
      price: '1200',
      category: 'Cultural',
    },
    {
      _id: 'tour5',
      title: 'Batanes Photography Tour',
      destination: 'Batanes, Philippines',
      duration: '5 Days 4 Nights',
      price: '18000',
      category: 'Nature',
    }
  ];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cars");
        const data = await res.json();
        const availableCars = data.filter(car => car.available === true);
        setCarsData(availableCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    const fetchTours = async () => {
      try {
        // Replace with actual API call when available
        // const res = await fetch("/api/tours");
        // const data = await res.json();
        // const availableTours = data.filter(tour => tour.available === true);
        setToursData(dummyTourData);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setToursData(dummyTourData); // Fallback to dummy data
      }
    };

    fetchCars();
    fetchTours();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      // Filter cars
      const filteredCarResults = carsData.filter(car =>
        car.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Filter tours
      const filteredTourResults = toursData.filter(tour =>
        tour.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredCars(filteredCarResults);
      setFilteredTours(filteredTourResults);
      setShowSearchResults(true);
    } else {
      setFilteredCars([]);
      setFilteredTours([]);
      setShowSearchResults(false);
    }
  }, [searchQuery, carsData, toursData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to appropriate page based on whether we have more cars or tours
      if (filteredCars.length >= filteredTours.length) {
        navigate(`/cars?search=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate(`/tours?search=${encodeURIComponent(searchQuery)}`);
      }
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  const handleCarSelect = (car) => {
    navigate(`/cars/${car._id}`);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const handleTourSelect = (tour) => {
    navigate(`/tours/${tour._id}`);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const handleOwnerDashboard = () => {
    navigate("/owner");
    setOpen(false);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setOpen(false);
    navigate("/");
  };

  const hasSearchResults = filteredCars.length > 0 || filteredTours.length > 0;

  return (
    <div className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${location.pathname === "/" ? "bg-light" : "bg-white"}`}>

      {/* Logo + Brand */}
      <Link to="/" className="flex items-center gap-3">
        <img src={assets.logo} alt="Logo" className="h-12 md:h-16 lg:h-20 cursor-pointer" />
        <div className="flex flex-col items-center leading-tight">
          <h1 className="text-xl md:text-2xl font-extrabold text-primary text-center">DORAYD</h1>
          <p className="text-xs md:text-sm text-gray-500 tracking-wide text-center">Travel and Tours</p>
        </div>
      </Link>

      {/* Mobile Menu Button */}
      <button className="sm:hidden" onClick={() => setOpen(!open)}>
        <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
      </button>

      {/* Navigation + Search */}
      <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>

        {/* Conditionally show nav links if not searching */}
        {!showSearchResults && menuLinks.map((link, index) => (
          <Link key={index} to={link.path} onClick={() => setOpen(false)}>
            {link.name}
          </Link>
        ))}

        {/* Search Bar */}
        <div className="relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              placeholder="Search cars or tours"
            />
            <button type="submit">
              <img src={assets.search_icon} alt="search" className="cursor-pointer" />
            </button>
          </form>

          <form onSubmit={handleSearchSubmit} className="lg:hidden flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full w-full max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              placeholder="Search cars or tours"
            />
            <button type="submit">
              <img src={assets.search_icon} alt="search" className="cursor-pointer" />
            </button>
          </form>

          {/* Enhanced Search Results Dropdown */}
          {showSearchResults && hasSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-borderColor rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
              <div className="p-2">
                
                {/* Cars Section */}
                {filteredCars.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-2 px-2">
                      <span>🚗 Cars ({filteredCars.length})</span>
                      {filteredCars.length > 3 && (
                        <button
                          onClick={() => {
                            navigate(`/cars?search=${encodeURIComponent(searchQuery)}`);
                            setShowSearchResults(false);
                            setSearchQuery("");
                          }}
                          className="text-primary hover:underline"
                        >
                          View all
                        </button>
                      )}
                    </div>
                    {filteredCars.slice(0, 3).map((car) => (
                      <div
                        key={car._id || car.id}
                        onClick={() => handleCarSelect(car)}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded mb-1"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">
                            {car.brand} {car.model} {car.name && `- ${car.name}`}
                          </div>
                          <div className="text-xs text-gray-500">
                            {car.type} • {car.location}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary">
                          ₱{car.pricePerDay || car.price}/day
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tours Section */}
                {filteredTours.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-2 px-2">
                      <span>🏝️ Tours ({filteredTours.length})</span>
                      {filteredTours.length > 3 && (
                        <button
                          onClick={() => {
                            navigate(`/tours?search=${encodeURIComponent(searchQuery)}`);
                            setShowSearchResults(false);
                            setSearchQuery("");
                          }}
                          className="text-primary hover:underline"
                        >
                          View all
                        </button>
                      )}
                    </div>
                    {filteredTours.slice(0, 3).map((tour) => (
                      <div
                        key={tour._id}
                        onClick={() => handleTourSelect(tour)}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded mb-1"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{tour.title}</div>
                          <div className="text-xs text-gray-500">
                            {tour.duration} • {tour.destination}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-green-600">
                          ₱{tour.price}/person
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {!hasSearchResults && (
                  <div className="text-center py-4 text-gray-500">
                    <div className="text-2xl mb-2">🔍</div>
                    <div className="text-sm">No cars or tours found</div>
                    <div className="text-xs">Try different keywords</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Auth Buttons */}
      {!showSearchResults && (
        <div className="flex max-sm:flex-col items-start sm:items-center gap-4">
          {isAuthenticated ? (
            <>
              <button onClick={handleOwnerDashboard} className="cursor-pointer hover:text-primary transition">
                Dashboard
              </button>

              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <img
                    src={user?.image || assets.user_profile}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.name || 'User'}
                  </span>
                  <svg className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-borderColor rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b border-borderColor">
                      <div className="font-medium text-gray-800">{user?.name}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                    <div className="py-1">
                      <button onClick={handleOwnerDashboard} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                        Owner Dashboard
                      </button>
                      <Link to="/my-bookings" onClick={() => setShowUserMenu(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                        My Bookings
                      </Link>
                      <div className="border-t border-borderColor">
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button onClick={handleOwnerDashboard} className="cursor-pointer px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition rounded-lg">
              Owner Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;