import React, { useEffect, useState } from "react";

const fetchLocationData = async (cityName) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    const data = await response.json();
    console.log("Location data:", data);
    
    if (data.results?.[0]) {
      return {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
        name: data.results[0].name,
        country: data.results[0].country
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};

const fetchWeatherData = async (latitude, longitude) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,cloud_cover,wind_speed_80m,soil_temperature_18cm,soil_moisture_9_to_27cm&timezone=Asia%2FSingapore&past_days=1`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log("Fetched weather data: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

const Services = () => {
  // Track which benefit is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [averageData, setAverageData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const locationData = await fetchLocationData(searchInput.trim());
      if (locationData) {
        setLocation(locationData);
        // Fetch weather data for new location
        const weatherData = await fetchWeatherData(
          locationData.latitude,
          locationData.longitude
        );
        if (weatherData?.hourly) {
          processWeatherData(weatherData);
        } else {
          setError("Unable to fetch weather data for this location.");
        }
      } else {
        setError("Location not found.");
      }
    } catch (err) {
      setError("Error searching for location.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const processWeatherData = (data) => {
    if (data?.hourly) {
      // Process current data
      const firstEntry = {
        time: data.hourly.time[0],
        temperature: data.hourly.temperature_2m[0],
        precipitation: data.hourly.precipitation[0],
        cloudCover: data.hourly.cloud_cover[0],
        windSpeed: data.hourly.wind_speed_80m[0],
        soilTemperature: data.hourly.soil_temperature_18cm[0],
        soilMoisture: data.hourly.soil_moisture_9_to_27cm[0]
      };
      setCurrentData(firstEntry);

      // Calculate averages
      const averages = calculateAverage(data.hourly);
      setAverageData(averages);
    }
  };

  useEffect(() => {
    const loadDefaultLocation = async () => {
      setIsLoading(true);
      try {
        const defaultLocation = {
          latitude: 28.6302,
          longitude: 77.4349,
          name: "New Delhi",
          country: "India"
        };
        setLocation(defaultLocation);

        const data = await fetchWeatherData(
          defaultLocation.latitude,
          defaultLocation.longitude
        );
        if (data?.hourly) {
          processWeatherData(data);
        }
      } catch (err) {
        setError("Error loading default location data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDefaultLocation();
  }, []);

  const calculateAverage = (hourlyData) => {
    try {
      const length = hourlyData.time.length;
      console.log("Calculating averages for length:", length);

      return {
        avgTemperature:
          hourlyData.temperature_2m?.reduce((sum, temp) => sum + temp, 0) /
            length || 0,
        avgPrecipitation:
          hourlyData.precipitation?.reduce((sum, prec) => sum + prec, 0) /
            length || 0,
        avgCloudCover:
          hourlyData.cloud_cover?.reduce((sum, cloud) => sum + cloud, 0) /
            length || 0,
        avgWindSpeed:
          hourlyData.wind_speed_80m?.reduce((sum, wind) => sum + wind, 0) /
            length || 0,
        avgSoilTemperature:
          hourlyData.soil_temperature_18cm?.reduce(
            (sum, soilTemp) => sum + soilTemp,
            0
          ) / length || 0,
        avgSoilMoisture:
          hourlyData.soil_moisture_9_to_27cm?.reduce(
            (sum, soilMoist) => sum + soilMoist,
            0
          ) / length || 0,
      };
    } catch (error) {
      console.error("Error calculating averages:", error);
      return null;
    }
  };

  const generateFarmingInsights = (avgData) => {
    if (!avgData) return null;

    const insights = [];
    
    // Temperature insights
    if (avgData.avgTemperature < 15) {
      insights.push({
        category: "Temperature Management",
        condition: "Cold conditions detected",
        actions: [
          "Consider using cold frames or row covers to protect sensitive crops",
          "Focus on cold-hardy vegetables like kale, spinach, and root vegetables",
          "Monitor soil temperature before planting new seeds"
        ]
      });
    } else if (avgData.avgTemperature > 30) {
      insights.push({
        category: "Temperature Management",
        condition: "Hot conditions detected",
        actions: [
          "Implement shade cloth or natural shading techniques",
          "Water during early morning or evening to reduce evaporation",
          "Consider heat-tolerant crop varieties"
        ]
      });
    } else if (avgData.avgTemperature > 15 && avgData.avgTemperature < 30) {
      insights.push({
        category: "Temperature Management",
        condition: "Moderate conditions detected",
        actions: [
          "Implement shade cloth or natural shading techniques",
          "Water during once either early morning or evening to reduce evaporation",
          "Consider moderate heat-tolerant crop varieties"
        ]
      });
    }

    // Moisture and precipitation insights
    const totalMoisture = avgData.avgSoilMoisture + avgData.avgPrecipitation;
    if (totalMoisture < 0.2) {
      insights.push({
        category: "Water Management",
        condition: "Dry conditions detected",
        actions: [
          "Consider implementing drip irrigation",
          "Apply mulch to retain soil moisture",
          "Monitor soil moisture levels regularly",
          "Choose drought-resistant crop varieties"
        ]
      });
    } else if (totalMoisture > 0.4) {
      insights.push({
        category: "Water Management",
        condition: "High moisture levels detected",
        actions: [
          "Ensure proper drainage in fields",
          "Consider raised beds for better water management",
          "Monitor for signs of root diseases",
          "Adjust irrigation schedules"
        ]
      });
    }

    // Wind conditions
    if (avgData.avgWindSpeed > 20) {
      insights.push({
        category: "Wind Protection",
        condition: "High wind conditions detected",
        actions: [
          "Install windbreaks or shelter belts",
          "Use row covers to protect young plants",
          "Consider wind-resistant crop varieties",
          "Monitor for wind damage regularly"
        ]
      });
    } else {
      insights.push({
        category: "Wind Protection",
        condition: "Light to medium conditions detected",
        actions: [
          "Monitor your crops occasionally",
          "Take more precaution for young plants"
        ]
      })
    }

    // Soil temperature insights
    if (avgData.avgSoilTemperature < 10) {
      insights.push({
        category: "Soil Management",
        condition: "Cold soil detected",
        actions: [
          "Use black plastic mulch to warm soil",
          "Consider adding organic matter to improve soil structure",
          "Wait for warmer conditions before planting heat-loving crops",
          "Focus on cold-tolerant varieties"
        ]
      });
    } else if (avgData.avgSoilTemperature > 25) {
      insights.push({
        category: "Soil Management",
        condition: "Warm soil detected",
        actions: [
          "Maintain organic mulch to regulate soil temperature",
          "Monitor soil moisture more frequently",
          "Consider shade cloth for temperature-sensitive crops",
          "Plant heat-loving crops"
        ]
      });
    }

    return insights;
  };

  // Function to toggle expansion of a benefit
  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const formatValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    return typeof value === "number" ? value.toFixed(2) : value;
  };

  return (
    <section className="py-20 px-4 md:px-20 bg-white">
      {/* Main Heading */}
      <div className="text-start mb-16">
        <h2 className="text-3xl md:text-5xl font-medium mb-4">
          Explore FarmFusion's Pioneering <br /> Technology
          <span className="text-3xl md:text-5xl text-gray-700">
            , Which Is Revolutionizing <br />
            Agricultural Practices And Shaping The <br />
            Future Of Food Production.
          </span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Product Section */}
        <div className="md:w-1/3 mb-12 md:mb-0">
          <h3 className="text-start text-2xl font-medium text-gray-700 mb-8">
            Our Sustainable Products
          </h3>
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
              <p className="text-gray-800 font-medium text-2xl">
                Organic Fertilizer
              </p>
            </div>
            <div className="text-start">
              <img
                src="/tech-irrigation.jpg"
                alt="Technology Irrigation"
                className="w-full h-96 object-cover rounded-md mb-6"
              />
              <p className="text-gray-800 font-medium text-2xl">
                Technology Irrigation
              </p>
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
            <h3 className="text-4xl md:text-5xl mb-4">
              Check Out FarmFusion's Awesome Modern Farming Solutions And See
              All The Cool Benefits.
            </h3>
            <p className="text-gray-600 max-w-3xl text-xl mb-8">
              At FarmFusion, we offer innovative services to revolutionize
              modern agriculture, helping you maximize productivity, minimize
              environmental impact, and achieve sustainable growth.
            </p>
          </div>

          {/* Benefits List */}
          <div className="max-w-5xl">
            <div className="mb-8">
              <form onSubmit={handleSearch} className="flex flex-col space-y-2">
                <div className="flex items-center bg-white rounded-full border border-gray-500 p-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter location"
                className="flex-1 px-4 py-2 text-gray-600 bg-transparent outline-none placeholder-gray-400"
                disabled={isLoading}
              />
              <button 
                type="submit"
                className="text-lime-500 text-white bg-lime-500 px-3 py-2 rounded-full font-semibold flex items-center"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search →"}
              </button>
              </div>

            <div className="px-4">
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              {location && !error && (
                <p className="text-gray-600 text-sm">
                  Showing data for: {location.name}, {location.country}
                </p>
              )}
            </div>
            </form>
            </div>

            <ul className="space-y-4">
              {/* Weather details */}
              <li
                className={`border-t py-4 cursor-pointer ${
                  expandedIndex === 1 ? "text-white" : ""
                }`}
                onClick={() => toggleExpand(1)}
              >
                <div className={`flex justify-between items-center text-5xl`}>
                  <div className={`font-medium`}>
                    <span
                      className={`mr-16 ${
                        expandedIndex === 1 ? "text-black" : "text-gray-800"
                      }`}
                    >
                      01
                    </span>
                    <span
                      className={
                        expandedIndex === 1 ? "text-black" : "text-gray-800"
                      }
                    >
                      Weather Details
                    </span>
                  </div>
                  <span
                    className={
                      expandedIndex === 1 ? "text-lime-500" : "text-black"
                    }
                  >
                    {expandedIndex === 1 ? "v" : ">"}
                  </span>
                </div>
                {expandedIndex === 1 && (
                  <h3 className="pl-32 mt-4 text-lg bg-white text-start text-black">
                    
                    {/* Display current data */}
                    {currentData ? (
                      <ul className="space-y-2">
                        <li>
                          Temperature: {formatValue(currentData.temperature)}°C
                        </li>
                        <li>
                          Precipitation: {formatValue(currentData.precipitation)} mm
                        </li>
                        <li>
                          Cloud Cover: {formatValue(currentData.cloudCover)}%
                        </li>
                        <li>
                          Wind Speed: {formatValue(currentData.windSpeed)} km/h
                        </li>
                        <li>
                          Soil Temperature: {formatValue(currentData.soilTemp)} °C
                        </li>
                        <li>
                          Soil Moisture: {formatValue(currentData.soilMoisture)} m³/m³
                        </li>
                      </ul>
                    ) : (
                      <p>Loading current conditions....</p>
                    )}
                  </h3>
                )}
              </li>

              {/* Benefit 2: Average Weather Data */}
              <li
                className={`border-t py-4 cursor-pointer ${
                  expandedIndex === 2 ? "text-white" : ""
                }`}
                onClick={() => toggleExpand(2)}
              >
                <div className={`flex justify-between items-center text-5xl`}>
                  <div className={`font-medium`}>
                    <span
                      className={`mr-16 ${
                        expandedIndex === 2 ? "text-black" : "text-gray-800"
                      }`}
                    >
                      02
                    </span>
                    <span
                      className={
                        expandedIndex === 2 ? "text-black" : "text-gray-800"
                      }
                    >
                      Average Weather Data
                    </span>
                  </div>
                  <span
                    className={
                      expandedIndex === 2 ? "text-lime-500" : "text-black"
                    }
                  >
                    {expandedIndex === 2 ? "v" : ">"}
                  </span>
                </div>
                {expandedIndex === 2 && (
                  <h3 className="pl-32 mt-4 text-lg bg-white text-start text-black">
                    {averageData ? (
                      <ul className="space-y-2">
                        <li>
                          Average Temperature: {averageData.avgTemperature.toFixed(2)} °C
                        </li>
                        <li>
                          Average Precipitation: {averageData.avgPrecipitation.toFixed(2)} mm
                        </li>
                        <li>
                          Average Cloud Cover: {averageData.avgCloudCover.toFixed(2)}%
                        </li>
                        <li>
                          Average Wind Speed: {averageData.avgWindSpeed.toFixed(2)} km/h
                        </li>
                        <li>
                          Average Soil Temperature: {averageData.avgSoilTemperature.toFixed(2)} °C
                        </li>
                        <li>
                          Average Soil Moisture: {averageData.avgSoilMoisture.toFixed(3)} m³/m³
                        </li>
                      </ul>
                    ) : (
                      <p>Loading average conditions...</p>
                    )}
                  </h3>
                )}
              </li>

              {/* Benefit 3: Recommendations */}
              <li
                className={`border-t py-4 cursor-pointer ${
                  expandedIndex === 3 ? "text-white" : ""
                }`}
                onClick={() => toggleExpand(3)}
              >
                <div className={`flex justify-between items-center text-5xl`}>
                  <div className={`font-medium`}>
                    <span
                      className={`mr-16 ${
                        expandedIndex === 3 ? "text-black" : "text-gray-800"
                      }`}
                    >
                      03
                    </span>
                    <span
                      className={
                        expandedIndex === 3 ? "text-black" : "text-gray-800"
                      }
                    >
                      Recommendations
                    </span>
                  </div>
                  <span
                    className={
                      expandedIndex === 3 ? "text-lime-500" : "text-black"
                    }
                  >
                    {expandedIndex === 3 ? "v" : ">"}
                  </span>
                </div>
                {expandedIndex === 3 && (
                <div className=" pl-32 space-y-6">
                {averageData ? (
                  <div>
                    {generateFarmingInsights(averageData).map((insight, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-center mb-4 mt-5">
                          <span className="w-3 h-3 bg-lime-500 rounded-full mr-2"></span>
                          <h5 className="text-lg font-semibold text-gray-800">
                            {insight.category}
                          </h5>
                        </div>
                        
                        <p className="text-gray-600 mb-2 font-medium">
                          {insight.condition}
                        </p>
                        
                        <ul className="list-disc pl-5 space-y-1">
                          {insight.actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="text-gray-700">
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-600">Loading farming insights...</p>
                  </div>
                )}
              </div>
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
