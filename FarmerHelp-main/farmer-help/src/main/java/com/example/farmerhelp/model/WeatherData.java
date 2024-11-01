package com.example.farmerhelp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "weather_data")
public class WeatherData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    private String time;
    private Double temperature;
    private Double precipitation;
    private Double cloudCover;
    private Double windSpeed;
    private Double soilTemp;
    private Double soilMoisture;
}