package com.skillstorm.backend.services;

import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.Shirt;
import com.skillstorm.backend.repositories.ShirtRepository;

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
