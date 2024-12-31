package com.example.farmerhelp.repository;

import com.example.farmerhelp.model.FarmingSuggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FarmingSuggestionRepository extends JpaRepository<FarmingSuggestion, Long> {
    List<FarmingSuggestion> findBySeason(String season);
}