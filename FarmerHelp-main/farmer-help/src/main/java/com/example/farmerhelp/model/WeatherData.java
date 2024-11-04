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
    public LocalDate date;

    @Column()
    public String time;
    @Column()
    public Double temperature;
    @Column()
    public Double setTemperature(double temperature) {
        return temperature;
    }
    @Column()
    public Double precipitation;
    public Double setPrecipitation(double precipitation) {
        return precipitation;
    }
    @Column()
    public Double cloudCover;
    public Double setCloudCover(double cloudCover) {
        return cloudCover;
    }
    @Column()
    public Double windSpeed;
    public Double setWindSpeed(double windSpeed) {
        return windSpeed;
    }
    @Column()
    public Double soilTemp;
    public Double setSoilTemp(double soilTemp) {
        return soilTemp;
    }
    @Column()
    public Double soilMoisture;
    public Double setSoilMoisture(double soilMoisture) {
        return soilMoisture;
    }
}