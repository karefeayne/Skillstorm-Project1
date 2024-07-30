package com.skillstorm.backend.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.Warehouse;
import com.skillstorm.backend.repositories.WarehouseRepository;

@Service
public class WarehouseService {

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

    public Optional<Warehouse> findById(int id) {
        return repo.findById(id);
    }

    public Warehouse save(Warehouse warehouse) {
        return repo.save(warehouse);
    }

    public void deleteAll() {
        repo.deleteAll();
    }

    public void deleteById(int id) {
        repo.deleteById(id);
    }

}
