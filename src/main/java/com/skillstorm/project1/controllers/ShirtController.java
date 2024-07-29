package com.skillstorm.project1.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.project1.models.Shirt;
import com.skillstorm.project1.services.ShirtService;
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
