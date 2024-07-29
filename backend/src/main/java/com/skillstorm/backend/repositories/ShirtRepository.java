package com.skillstorm.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillstorm.backend.models.Shirt;

public interface ShirtRepository extends JpaRepository<Shirt, Integer> {

}
