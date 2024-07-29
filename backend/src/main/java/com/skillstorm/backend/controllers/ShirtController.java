package com.skillstorm.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.backend.models.Shirt;
import com.skillstorm.backend.services.ShirtService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/shirts")
@CrossOrigin //(origins = "http://localhost:5173")
public class ShirtController {


    private ShirtService service;

    public ShirtController(ShirtService service) {
        this.service = service;
    }

    @GetMapping
    public Iterable<Shirt> findAll() {
        return service.findAll();
    }
    
}
