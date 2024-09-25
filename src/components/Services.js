import React, { useState } from 'react';

const Services = () => {
  // Track which benefit is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Function to toggle expansion of a benefit
  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <section className="py-20 px-4 md:px-20 bg-white">
      {/* Main Heading */}
      <div className="text-start mb-16">
        <h2 className="text-3xl md:text-5xl font-medium mb-4">
          Explore FarmFusion's Pioneering <br /> Technology
          <span className="text-3xl md:text-5xl text-gray-700">, Which Is Revolutionizing <br /> 
          Agricultural Practices And Shaping The <br /> 
          Future Of Food Production.</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Product Section */}
        <div className="md:w-1/3 mb-12 md:mb-0">
          <h3 className="text-start text-2xl font-medium text-gray-700 mb-8">Our Sustainable Products</h3>
        </div>

        {/* Content on the right side */}
        <div className="md:w-2/3 md:pl-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-start">
              <img 
                src="/fertiliser.jpg" 
                alt="Organic Fertilizer" 
                className="w-full h-96 object-cover rounded-md mb-6" 
              />
              <p className="text-gray-800 font-medium text-2xl">Organic Fertilizer</p>
            </div>
            <div className="text-start">
              <img 
                src="/tech-irrigation.jpg" 
                alt="Technology Irrigation" 
                className="w-full h-96 object-cover rounded-md mb-6" 
              />
              <p className="text-gray-800 font-medium text-2xl">Technology Irrigation</p>
            </div>
            <div className="text-start">
              <img 
                src="/weather.jpg" 
                alt="Weather" 
                className="w-full h-96 object-cover rounded-md mb-6" 
              />
              <p className="text-gray-800 font-medium text-2xl">Weather</p>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="text-start mt-20 mb-12">
            <h3 className="text-4xl md:text-5xl mb-4">Check Out FarmFusion's Awesome Modern Farming Solutions And See All The Cool Benefits.</h3>
            <p className="text-gray-600 max-w-3xl text-xl mb-8">
              At FarmFusion, we offer innovative services to revolutionize modern agriculture, helping you maximize productivity, minimize environmental impact, and achieve sustainable growth.
            </p>
          </div>

          {/* Benefits List */}
          <div className="max-w-3xl">
            <h4 className="text-lg text-start text-2xl mb-4">Benefits Of FarmFusion</h4>
            <ul className="space-y-4">
              {/* Benefit 1: Increase Crop Yield */}
              <li 
                className={`border-t py-4 cursor-pointer ${expandedIndex === 1 ? 'text-white' : ''}`} 
                onClick={() => toggleExpand(1)}
              >
                <div className={`flex justify-between items-center text-2xl ${expandedIndex === 1 ? 'bg-lime-500': ''}`}>
                  <div className={`font-medium`}>
                    <span className={`mr-12 ${expandedIndex === 1 ? 'text-white' : 'text-gray-800'}`}>01</span>
                    <span className={expandedIndex === 1 ? 'text-white' : 'text-gray-800'}>Increase Crop Yield</span>
                  </div>
                  <span className={expandedIndex === 1 ? 'text-white' : 'text-lime-500'}>
                    {expandedIndex === 1 ? 'v' : '>'}
                  </span>
                </div>
                {expandedIndex === 1 && (
                  <p className="mt-4 text-lg bg-white text-black">
                    By using our organic fertilizers and technology-driven irrigation systems, you can significantly boost crop yields while maintaining sustainability.
                  </p>
                )}
              </li>

              {/* Benefit 2: Reduce Water Usage */}
              <li 
                className={`border-t py-4 cursor-pointer ${expandedIndex === 2 ? 'bg-lime-500 text-white' : ''}`} 
                onClick={() => toggleExpand(2)}
              >
                <div className="flex justify-between items-center text-2xl">
                  <div className="font-medium">
                    <span className={`mr-12 ${expandedIndex === 2 ? 'text-white' : 'text-gray-800'}`}>02</span>
                    <span className={expandedIndex === 2 ? 'text-white' : 'text-gray-800'}>Reduce Water Usage</span>
                  </div>
                  <span className={expandedIndex === 2 ? 'text-white' : 'text-lime-500'}>
                    {expandedIndex === 2 ? 'v' : '>'}
                  </span>
                </div>
                {expandedIndex === 2 && (
                  <p className="mt-4 text-lg">
                    Our advanced irrigation technologies reduce water waste, making sure that water is used more efficiently while still optimizing growth.
                  </p>
                )}
              </li>

              {/* Benefit 3: Improve Soil Health */}
              <li 
                className={`border-t border-b py-4 cursor-pointer ${expandedIndex === 3 ? 'bg-lime-500 text-white' : ''}`} 
                onClick={() => toggleExpand(3)}
              >
                <div className="flex justify-between items-center text-2xl">
                  <div className="font-medium">
                    <span className={`mr-12 ${expandedIndex === 3 ? 'text-white' : 'text-gray-800'}`}>03</span>
                    <span className={expandedIndex === 3 ? 'text-white' : 'text-gray-800'}>Improve Soil Health</span>
                  </div>
                  <span className={expandedIndex === 3 ? 'text-white' : 'text-lime-500'}>
                    {expandedIndex === 3 ? 'v' : '>'}
                  </span>
                </div>
                {expandedIndex === 3 && (
                  <p className="mt-4 text-lg">
                    Our soil health monitoring tools and organic fertilizers help restore and maintain soil health, ensuring long-term fertility.
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
