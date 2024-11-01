import React from 'react';

const Solutions = () => {
  return (
    <section className="py-20 px-4 md:px-20 bg-black text-white">
      <div className="text-start mb-16">
        <h2 className="text-3xl md:text-5xl font-medium mb-16">
          Innovative Modern Agriculture Solutions <br /> For Achieving Optimal Crop Growth <br /> And Yield.
        </h2>
        <p className="text-2xl font-normal text-start text-gray-400 max-w-3xl">
          We provide cutting-edge services to help farmers maximize crop yields. Our precision farming, crop monitoring, and automation solutions are here to revolutionize agriculture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
        <div>
          <img 
            src="/precision-farming.jpg" 
            alt="Precision Farming" 
            className="w-full h-96 object-cover rounded-md mb-6"
          />
          <h3 className="text-2xl font-normal mb-2">Precision Farming</h3>
          <p className="text-gray-400">
            Our precision farming techniques use advanced technology to optimize all farm operations.
          </p>
        </div>

        <div>
          <img 
            src="/crop-monitoring.jpg" 
            alt="Crop Monitoring" 
            className="w-full h-96 object-cover rounded-md mb-6"
          />
          <h3 className="text-2xl font-normal mb-2">Crop Monitoring</h3>
          <p className="text-gray-400">
            Monitor your crops' health and growth in real time with our solutions.
          </p>
        </div>

        <div>
          <img 
            src="/autonomic-sols.jpg" 
            alt="Automation Solutions" 
            className="w-full h-96 object-cover rounded-md mb-6"
          />
          <h3 className="text-2xl font-normal mb-2">Automation Solutions</h3>
          <p className="text-gray-400">
            Optimize your farm with our advanced automation for increased efficiency and productivity.
          </p>
        </div>
      </div>

      <div className="text-start mt-20">
        <h3 className="text-6xl ps-[30vw] font-medium mb-[10vh] leading-snug">
          Changing the Game in <br /> 
          Farming with Sustainable <br /> 
          Practices and Cool <br />
          Technologies, Shaping the <br />
          Future of Agriculture
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div>
            <img 
              src="/farm1.avif" 
              alt="Farm 1" 
              className="w-full h-96 object-cover rounded-md mb-6"
            />
            <p className="text-gray-400">Iowa Farms, Iowa City</p>
          </div>

          <div>
            <img 
              src="/farm2.avif" 
              alt="Farm 2" 
              className="w-full h-96 object-cover rounded-md mb-6"
            />
            <p className="text-gray-400">Queensland, Australia</p>
          </div>

          <div>
            <img 
              src="/farm3.avif" 
              alt="Farm 3" 
              className="w-full h-96 object-cover rounded-md mb-6"
            />
            <p className="text-gray-400">Farm in Zimbabwe</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
