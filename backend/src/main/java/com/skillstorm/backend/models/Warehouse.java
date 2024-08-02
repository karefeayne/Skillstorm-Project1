package com.skillstorm.backend.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="warehouses")
public class Warehouse {

    // The (Container) so to say of the application.
    // This is where all other entiries are "stores" in
    // Shirts, Pants, Hats, Shoes, Etc...

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name", length = 50)
    private String name;

    @Column(name="state", length = 25)
    private String state;

    @Column(name="city", length = 50)
    private String city;

    @Column(name="capacity")
    private int capacity;


    // Allows us to map shirts to warehouses
    // These annotations allow us to create a junction table
    // without actually needing to have it phycially in the database

    // JsonBackReference is for nested entities that have each other ad
    // variables. Will create a never ending loop is not checked
    @OneToMany(mappedBy = "warehouse", targetEntity = Shirt.class)
    @JsonBackReference
    List<Shirt> shirts;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public List<Shirt> getShirts() {
        return shirts;
    }

    public void setShirts(List<Shirt> shirts) {
        this.shirts = shirts;
    }

    @Override
    public String toString() {
        return "Warehouse [id=" + id + ", name=" + name + ", state=" + state + ", city=" + city + ", capacity="
                + capacity + ", shirts=" + shirts + "]";
    }

}
