package com.skillstorm.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.skillstorm.backend.models.Warehouse;
import java.util.List;


public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {


    @Query(value = "select * from warehouses where name=?1", nativeQuery = true)
    List<Warehouse> findByName(String name);

    @Query(value = "select * from warehouses where id=?1", nativeQuery = true)
    List<Warehouse> findFromId(int value);

    @Query(value = "select * from warehouses where state=?1", nativeQuery = true)
    List<Warehouse> findByState(String value);

    @Query(value = "select * from warehouses where city=?1", nativeQuery = true)
    List<Warehouse> findByCity(String value);

    @Query(value = "select * from warehouses where name=?1", nativeQuery = true)
    Warehouse retrieveByName(String name);
}
