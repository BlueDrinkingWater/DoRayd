import React, { useEffect, useState } from "react";
import { dummyMyBookingsData, assets } from "../assets/assets";
import Title from "../components/Title";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY || "$"; // fallback if env missing

  const fetchMyBookings = async ()=> {
    setBookings(dummyMyBookingsData)
  }
  useEffect(() => {
    setBookings(dummyMyBookingsData);
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <Title title="My Bookings" subTitle="Here are all your booked cars and rental details." />

      {bookings.length === 0 ? (
        <p className="text-gray-500 mt-10">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
          {bookings.map((booking) => {
            const {
              _id,
              car,
              status,
              pickupDate,
              returnDate,
              price,
              createdAt,
            } = booking;

            const formattedPickup = pickupDate.slice(0, 10);
            const formattedReturn = returnDate.slice(0, 10);
            const formattedCreated = createdAt.slice(0, 10);

            const rentalDays =
              (new Date(returnDate) - new Date(pickupDate)) /
              (1000 * 60 * 60 * 24);

            return (
              <div
                key={_id}
                className="bg-white rounded-xl shadow-md p-4 space-y-3 border border-gray-100"
              >
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="h-40 w-full object-cover rounded-md"
                />

                <div>
                  <h3 className="text-lg font-semibold">
                    {car.brand} {car.model} ({car.year})
                  </h3>
                  <p className="text-sm text-gray-500">
                    {car.category} · {car.location}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <img
                    src={assets.calendar_icon_colored}
                    alt="calendar"
                    className="h-4"
                  />
                  <span>
                    {formattedPickup} → {formattedReturn}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  Rental Period:{" "}
                  <strong>
                    {rentalDays} day{rentalDays > 1 ? "s" : ""}
                  </strong>
                </p>

                <p className="text-sm text-gray-600">
                  Price:{" "}
                  <strong>
                    {currency}
                    {price}
                  </strong>
                </p>

                <p className="text-sm text-gray-600">
                  Booked On:{" "}
                  <span className="text-gray-500">{formattedCreated}</span>
                </p>

                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      status === "confirmed"
                        ? "text-green-600"
                        : status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {status}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
