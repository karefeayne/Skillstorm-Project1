package com.skillstorm.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.skillstorm.backend.models.Shirt;
import com.skillstorm.backend.models.Warehouse;
import com.skillstorm.backend.repositories.ShirtRepository;
import com.skillstorm.backend.repositories.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
public class ShirtService {

    private ShirtRepository shirtRepo;

    private WarehouseRepository warehouseRepo;

    public ShirtService(ShirtRepository shirtRepo, WarehouseRepository warehouseRepo) {
        this.shirtRepo = shirtRepo;
        this.warehouseRepo = warehouseRepo;
    }

    public Iterable<Shirt> findAll() {
        return shirtRepo.findAll();
    }

    public Optional<Shirt> findById(int id) {
        return shirtRepo.findById(id);
    }

    public Iterable<Shirt> findByShirtType(String type) {
        return shirtRepo.findByShirtType(type);
    }

    public Iterable<Shirt> findByShirtColor(String color) {
        return shirtRepo.findByShirtColor(color);
    }

    public Iterable<Shirt> findByShirtSize(String size) {
        return shirtRepo.findByShirtSize(size);
    }

    public Iterable<Shirt> findByShirtPrice(float price) {
        return shirtRepo.findByShirtPrice(price);
    }

    public List<Shirt> findByShirtWarehouse(String warehouse) {
        return warehouseRepo.retrieveByName(warehouse).getShirts();        
    }

    public Shirt update(Shirt shirt) {
        Optional<Shirt> shirtParam = findById(shirt.getId());

        Shirt updatedShirt = shirtParam.get();

        updatedShirt.setShirtType(shirt.getShirtType());
        updatedShirt.setShirtColor(shirt.getShirtColor());
        updatedShirt.setShirtSize(shirt.getShirtSize());
        updatedShirt.setPrice(shirt.getPrice());
        updatedShirt.setWarehouse(shirt.getWarehouse());

        shirtRepo.save(updatedShirt);

        return shirt;
    }
    
    @Transactional
    public Shirt save(Shirt shirt) {

        // TODO: flush out the logic here
        Warehouse warehouse = shirt.getWarehouse();

        if(warehouseRepo.existsById(warehouse.getId())) {
            Warehouse knownWarehouse = warehouseRepo.findById(warehouse.getId()).get();
            shirt.setWarehouse(knownWarehouse);
        }
        else {
            throw new RuntimeException("Could not save shirt because warehouse does not exist");
        }

        return shirtRepo.save(shirt);
    }

    public void deleteAll() {
        shirtRepo.deleteAll();
    }

    public void deleteById(int id) {
        shirtRepo.deleteById(id);
    }

}
