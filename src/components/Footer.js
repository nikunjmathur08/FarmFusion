import React from 'react';

const Footer = () => {
  return (
    <footer id="#about" className="bg-black text-white py-8 px-4 md:px-20">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-center mb-4 md:mb-0">
          <p className="text-gray-400">&copy; FarmFusion 2024</p>
        </div>

        <div className="flex space-x-4">
          <a href="/privacy-policy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms-of-use" className="text-gray-400 hover:text-white">
            Terms Of Use
          </a>
        </div>
      </div>
      
      <div className="text-center mb-4 md:mb-0 md:flex-grow">
        <h1 className="text-[320px] text-center font-bold leading-none">FarmFusion</h1>
      </div>

      <div className="fixed bottom-4 right-4">
        <a href="#top" className="bg-[#D8F267] text-black px-4 py-2 rounded-full flex items-center space-x-2">
          <span>Back to top</span>
          <div className="bg-black text-white p-2 rounded-full">
            <img 
              src='/up.png'
              alt='up-arrow'
              className="h-5 w-5"
            />
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
