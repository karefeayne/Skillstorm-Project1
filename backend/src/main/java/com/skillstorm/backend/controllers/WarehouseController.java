package com.skillstorm.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.backend.models.Shirt;
import com.skillstorm.backend.models.Warehouse;
import com.skillstorm.backend.services.ShirtService;
import com.skillstorm.backend.services.WarehouseService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/warehouses")
@CrossOrigin
public class WarehouseController {

    private WarehouseService wareService;

    private ShirtService shirtService;

    public WarehouseController(WarehouseService wareService, ShirtService shirtService) {
        this.wareService = wareService;
        this.shirtService = shirtService;
    }

    @GetMapping
    public Iterable<Warehouse> findAll() {
        return wareService.findAll();
    }

    @GetMapping("/exists/{id}")
    public boolean existsById(@PathVariable int id) {
        return wareService.existsById(id);
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> findById(@PathVariable int id) {
        Optional<Warehouse> warehouse = wareService.findById(id);
        if (warehouse.isPresent())
            return ResponseEntity.ok(warehouse.get());
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<Warehouse> findById(@PathVariable int id) {
    //     Optional<Warehouse> warehouse = wareService.findById(id);
    //     if (warehouse.isPresent())
    //         return ResponseEntity.ok(warehouse.get());
    //     else
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }

    @GetMapping("byId/{value}")
    public List<Warehouse> findFromId(@PathVariable int value) {
        return wareService.findFromId(value);
    }


    @GetMapping("byName/{value}")
    public List<Warehouse> findByName(@PathVariable String value) {
        return wareService.findByName(value);
    }

    @GetMapping("byState/{value}")
    public List<Warehouse> findByState(@PathVariable String value) {
        return wareService.findByState(value);
    }

    @GetMapping("byCity/{value}")
    public List<Warehouse> findByCity(@PathVariable String value) {
        return wareService.findByCity(value);
    }
    

    // Returns all the shirts that are associated with the
    // warehouse that has the id passed in as an argument
    @GetMapping("/{id}/shirts")
    public List<Shirt> warehouseShirts(@PathVariable int id) {
        Optional<Warehouse> warehouse = wareService.findById(id);
        List<Shirt> shirts = warehouse.get().getShirts();
        return shirts;
    }  
    

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public Warehouse create(@Valid @RequestBody Warehouse warehouse) {
        return wareService.save(warehouse);
    }

    @PutMapping()
    @ResponseStatus(code = HttpStatus.NO_CONTENT) 
    public Warehouse update(@Valid @RequestBody Warehouse warehouse) {
        return wareService.update(warehouse);
    }


    // Deletes all warehouses and all associated shirts
    @DeleteMapping("/all")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteAll() {
        Iterable<Warehouse> warehouses = findAll();

        for(Warehouse warehouse: warehouses) {
            deleteById(warehouse.getId());
        }
    }


    // Deletes that warehouse associated with the id given
    // And also deletes all shirts that had that warehouse
    // as their warehouse id
    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable int id) {
        List<Shirt> shirts = warehouseShirts(id);

        for(Shirt shirt: shirts) {
            shirtService.deleteById(shirt.getId());
        }

        wareService.deleteById(id);
    }
    

}
