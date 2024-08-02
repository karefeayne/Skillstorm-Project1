package com.skillstorm.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.Shirt;
import com.skillstorm.backend.models.Warehouse;
import com.skillstorm.backend.repositories.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
public class WarehouseService {


    /**
     * lets us talk directly to out repository class
     * which handles communication with the database
     */
    private WarehouseRepository repo;

    public WarehouseService(WarehouseRepository repo) {
        this.repo = repo;
    }

    public Iterable<Warehouse> findAll() {
        return repo.findAll();
    }

    public boolean existsById(int id) {
        return repo.existsById(id);
    }

    public List<Warehouse> findByName(String name) {
        return repo.findByName(name);
    }

    public Optional<Warehouse> findById(int id) {
        return repo.findById(id);
    }

    public List<Warehouse> findFromId(int value) {
        return repo.findFromId(value);
    }

    
    public List<Warehouse> findByState(String value) {
        return repo.findByState(value);
    }

    public List<Warehouse> findByCity(String value) {
        return repo.findByCity(value);
    }

    // input validation is done way before this bit of code runs
    // so no check here
    public Warehouse update(Warehouse warehouse) {
        Optional<Warehouse> warehouseParam = findById(warehouse.getId());

        Warehouse updatedWarehouse = warehouseParam.get();

        updatedWarehouse.setName(warehouse.getName());
        updatedWarehouse.setState(warehouse.getState());
        updatedWarehouse.setCity(warehouse.getCity());
        updatedWarehouse.setCapacity(warehouse.getCapacity());

        repo.save(updatedWarehouse);

        return warehouse;
    }

    @Transactional
    public Warehouse save(Warehouse warehouse) {
        if (findByName(warehouse.getName()).isEmpty()) {
            return repo.save(warehouse);
        }
        else {
            throw new RuntimeException("Could not add Warehouse " +
            "because one with that name already eixists");
        }
    }

    public void deleteAll() {
        repo.deleteAll();
    }

    public void deleteById(int id) {
        repo.deleteById(id);
    }

}
