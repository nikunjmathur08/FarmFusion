import React from "react";

const Banner = () => {
  return (
    <section className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/farm.jpg")' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Lightened overlay for text readability */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-start text-white px-4 md:px-20 md:py-10">
        
        {/* Large Heading - Reduced size and center aligned */}
        <h1 className="text-4xl md:text-8xl font-bold mb-4 leading-tight">
          Revolutionizing Agriculture Through Innovation
        </h1>

        {/* Subheading - Slightly larger and more prominent */}
        <p className="text-lg md:text-2xl mb-6">
          Explore Sustainable Agricultural Solutions And Cutting-Edge Technologies.
        </p>

        {/* Button - Slightly smaller and centered */}
        <a
          href="#solutions"
          className="bg-[#D8F267] text-black py-2 px-6 rounded-full text-lg hover:bg-black hover:text-[#D8F267] transition-all duration-300"
        >
          Our Solutions
        </a>
      </div>

      {/* Explore More Section */}
      <div className="absolute bottom-8 w-full text-center">
        <a href="#explore" className="text-white text-lg hover:text-gray-300 transition-colors duration-300">
          Explore More ↓
        </a>
      </div>
    </section>
  );
};

export default Banner;
