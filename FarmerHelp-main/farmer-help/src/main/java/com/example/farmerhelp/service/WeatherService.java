package com.example.farmerhelp.service;

import com.example.farmerhelp.model.WeatherData;
import com.example.farmerhelp.repository.WeatherDataRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Service
public class WeatherService {

    // private Connection connection;

    private final WeatherDataRepository weatherDataRepository;

    public WeatherService(WeatherDataRepository weatherDataRepository) {
        this.weatherDataRepository = weatherDataRepository;
    }

    public List<WeatherData> getWeatherForecastForPastWeek() {
        
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(7);
        return weatherDataRepository.findByDateBetweenOrderByDateDesc(startDate, endDate);
    }

    public WeatherData saveWeatherData(String time, double temperature, double precipitation, double cloudCover, double windSpeed, double soilTemp, double soilMoisture) {
        // String sql = "INSERT INTO weather_data (time, temperature, precipitation, cloud_cover, soil_temperature, soil_values) VALUES (?, ?, ?, ?, ?, ?, ?)";

        // try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
        //     pstmt.setString(1, time);
        //     pstmt.setDouble(2, temperature);
        //     pstmt.setDouble(3, precipitation);
        //     pstmt.setDouble(4, cloudCover);
        //     pstmt.setDouble(5, windSpeed);
        //     pstmt.setDouble(6, soilTemp);
        //     pstmt.setDouble(7, soilMoisture);
        //     pstmt.executeUpdate();
        // } catch (SQLException e) {
        //     System.out.println(e.getMessage());
        // }
        WeatherData weather = new WeatherData();
        weather.setTemperature(temperature);
        weather.setPrecipitation(precipitation);
        weather.setCloudCover(cloudCover);
        weather.setWindSpeed(windSpeed);
        weather.setSoilTemp(soilTemp);
        weather.setSoilMoisture(soilMoisture);

        return weatherDataRepository.save(weather);
    }

    // Add method to fetch weather data from an external API and save it to the database
}