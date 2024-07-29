package com.skillstorm.project1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillstorm.project1.models.Shirt;

public interface ShirtRepository extends JpaRepository<Shirt, Integer> {

}
