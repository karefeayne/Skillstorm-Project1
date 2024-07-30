package com.skillstorm.backend.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.Shirt;
import com.skillstorm.backend.models.Warehouse;
import com.skillstorm.backend.repositories.ShirtRepository;
import com.skillstorm.backend.repositories.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
public class ShirtService {

    private ShirtRepository repo;

    private WarehouseRepository warehouseRepo;

    public ShirtService(ShirtRepository repo, WarehouseRepository warehouseRepo) {
        this.repo = repo;
        this.warehouseRepo = warehouseRepo;
    }

    public Iterable<Shirt> findAll() {
        return repo.findAll();
    }

    public Optional<Shirt> findById(int id) {
        return repo.findById(id);
    }

    
    @Transactional
    public Shirt save(Shirt shirt) {

        // TODO: Understand the need for this section
        // TODO: flush out the logic here
        Warehouse warehouse = shirt.getWarehouse();

        if(warehouseRepo.existsById(warehouse.getId())) {
            Warehouse knownWarehouse = warehouseRepo.findById(warehouse.getId()).get();
            shirt.setWarehouse(knownWarehouse);
        }
        else {
            throw new RuntimeException("Could not save shirt because warehouse does not exist");
        }

        return repo.save(shirt);
    }

    public void deleteAll() {
        repo.deleteAll();
    }

    public void deleteById(int id) {
        repo.deleteById(id);
    }

}
