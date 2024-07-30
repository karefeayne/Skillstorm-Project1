package com.skillstorm.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillstorm.backend.models.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {

}
