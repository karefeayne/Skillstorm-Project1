package com.skillstorm.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.backend.models.Shirt;
import com.skillstorm.backend.services.ShirtService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/shirts")
@CrossOrigin //(origins = "http://localhost:5173")
public class ShirtController {


    // Talks to and sends requests to the service (logic) side of the application
    private ShirtService service;

    // Basically the same thing as @Autowired for service variable
    public ShirtController(ShirtService service) {
        this.service = service;
    }

    // Various modes of get request based on what
    // Arguments and vvariables we are given from the front end
    @GetMapping
    public Iterable<Shirt> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shirt> findById(@PathVariable int id) {
        Optional<Shirt> shirt = service.findById(id);
        if (shirt.isPresent())
            return ResponseEntity.ok(shirt.get());
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("byType/{type}")
    public Iterable<Shirt> findByShirtType(@PathVariable String type) {
        return service.findByShirtType(type);
    }

    @GetMapping("byColor/{color}")
    public Iterable<Shirt> findByShirtColor(@PathVariable String color) {
        return service.findByShirtColor(color);
    }

    @GetMapping("bySize/{size}")
    public Iterable<Shirt> findByShirtSize(@PathVariable String size) {
        return service.findByShirtSize(size);
    }

    @GetMapping("byPrice/{price}")
    public Iterable<Shirt> findByShirtPrice(@PathVariable float price) {
        return service.findByShirtPrice(price);
    }

    @GetMapping("warehouse/{warehouse}")
    public Iterable<Shirt> findByShirtWarehouse(@PathVariable String warehouse) {
        return service.findByShirtWarehouse(warehouse);
    }


    // Only 1 post method that handles all of our needs
    // for the application
    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public Shirt create(@Valid @RequestBody Shirt shirt) {
        return service.save(shirt);
    }

    // Also only 1 put request as this serves the purpose of
    // allowing out front end to send it inputs of any kinds
    // and all will still be handled because of the stucture of
    // what this method requires as input
    @PutMapping()
    @ResponseStatus(code = HttpStatus.NO_CONTENT) 
    public Shirt update(@Valid @RequestBody Shirt shirt) {
        return service.update(shirt);
    }


    // Delete methods that can either completely wipe the database
    // of all items, or one by one by their unique id
    @DeleteMapping("/all")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteAll() {
        service.deleteAll();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable int id) {
        service.deleteById(id);
    }
    
}
