package com.skillstorm.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "shirts")     // name of database table is different from name of class
public class Shirt {

    // Use this variable as the primary key for this entity
    // and generate an id for each entry based on the
    // primary key column of the table
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="shirt_type", length = 25)
    private String shirtType;

    @Column(name="color")
    private String shirtColor;

    @Column(name="shirt_size", length = 10)
    private String shirtSize;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getShirtType() {
        return shirtType;
    }

    public void setShirtType(String shirtType) {
        this.shirtType = shirtType;
    }

    public String getShirtColor() {
        return shirtColor;
    }

    public void setShirtColor(String shirtColor) {
        this.shirtColor = shirtColor;
    }

    public String getShirtSize() {
        return shirtSize;
    }

    public void setShirtSize(String shirtSize) {
        this.shirtSize = shirtSize;
    }

    @Override
    public String toString() {
        return "Shirt [id=" + id + ", shirtType=" + shirtType + ", shirtColor=" + shirtColor + ", shirtSize="
                + shirtSize + "]";
    }
}