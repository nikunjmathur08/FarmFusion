package com.example.farmerhelp.repository;

import com.example.farmerhelp.model.WeatherData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface WeatherDataRepository extends JpaRepository<WeatherData, Long> {
    List<WeatherData> findByDateBetweenOrderByDateDesc(LocalDate startDate, LocalDate endDate);
}