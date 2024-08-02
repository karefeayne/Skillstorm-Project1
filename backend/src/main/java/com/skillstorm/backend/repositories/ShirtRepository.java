package com.skillstorm.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.skillstorm.backend.models.Shirt;
import java.util.List;


public interface ShirtRepository extends JpaRepository<Shirt, Integer> {


    // A few queries that were needed for nieche operations in the application
    // JpaRepository had most the basic and useful requests that we needed
    @Query(value = "select * from shirts where shirt_type=?1", nativeQuery = true)
    List<Shirt> findByShirtType(String shirtType);

    @Query(value = "select * from shirts where color=?1", nativeQuery = true)
    List<Shirt> findByShirtColor(String color);

    @Query(value = "select * from shirts where shirt_size=?1", nativeQuery = true)
    List<Shirt> findByShirtSize(String size);

    @Query(value = "select * from shirts where price=?1", nativeQuery = true)
    List<Shirt> findByShirtPrice(float price);
}
