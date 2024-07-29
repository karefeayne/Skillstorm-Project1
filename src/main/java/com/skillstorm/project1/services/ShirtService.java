package com.skillstorm.project1.services;

import org.springframework.stereotype.Service;

import com.skillstorm.project1.models.Shirt;
import com.skillstorm.project1.repositories.ShirtRepository;

@Service
public class ShirtService {

    private ShirtRepository repo;

    public ShirtService(ShirtRepository repo) {
        this.repo = repo;
    }

    public Iterable<Shirt> findAll() {
        return repo.findAll();
    }

}
