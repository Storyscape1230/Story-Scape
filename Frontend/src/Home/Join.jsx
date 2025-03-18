import { useState } from "react";
import Joinbackground from "../assets/Joinbackground.png";

const Join = () => {
  const [email, setEmail] = useState(""); // State to store the email input
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (email) { // Check if the email is not empty
      setIsSubmitted(true); // Show the success message
      setEmail(""); // Clear the input field
    }
  };

  return (
    <div className="mb-10 mt-20">
      {/* Hero Section */}
      <div className="relative w-full">
        <img
          alt="A vast green agricultural field with trees in the background"
          className="w-full h-[500px] object-cover"
          src={Joinbackground}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold text-center px-4">
            Get Involved in the Agricultural Uprising
          </h1>
          <p className="mt-4 text-lg md:text-xl text-center px-4 max-w-2xl">
            Join us in revolutionizing agriculture for a sustainable future. Together, we can make a difference.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col md:flex-row items-center gap-4 w-full max-w-md px-4">
            <input
              className="w-full md:w-2/3 p-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-600"
              placeholder="Type your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update the email state
              required // Ensure the input is not empty
            />
            <button
              type="submit"
              className="w-full md:w-1/3 bg-green-500 text-white px-6 py-4 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Join Now
            </button>
          </form>
          {/* Success Message */}
          {isSubmitted && (
            <p className="mt-4 text-lg text-green-400 font-semibold">
              Successfully joined! Thank you for being part of the movement.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Join;