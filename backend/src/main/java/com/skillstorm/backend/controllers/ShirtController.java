package com.skillstorm.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.backend.models.Shirt;
import com.skillstorm.backend.services.ShirtService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/shirts")
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
