package com.example.farmerhelp.controller;

import com.example.farmerhelp.model.WeatherData;
import com.example.farmerhelp.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

//     @GetMapping("/forecast")
//     public ResponseEntity<List<WeatherData>> getWeatherForecast() {
//         List<WeatherData> forecast = weatherService.getWeatherForecastForPastWeek();
//         return ResponseEntity.ok(forecast);
//     }
}