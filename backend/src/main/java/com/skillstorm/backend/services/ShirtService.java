package com.skillstorm.backend.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.Shirt;
import com.skillstorm.backend.repositories.ShirtRepository;

import jakarta.transaction.Transactional;

@Service
public class ShirtService {

    private ShirtRepository repo;

    public ShirtService(ShirtRepository repo) {
        this.repo = repo;
    }

    public Iterable<Shirt> findAll() {
        return repo.findAll();
    }

    public Optional<Shirt> findById(int id) {
        return repo.findById(id);
    }

    @Transactional
    public Shirt save(Shirt shirt) {
        return repo.save(shirt);
    }

    public void deleteAll() {
        repo.deleteAll();
    }

    public void deleteById(int id) {
        repo.deleteById(id);
    }

}
