package com.team12.btl.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "complexity")
public class Complexity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "complexity", nullable = false)
    private Integer complexity;

    @Column(name = "grade_salary", nullable = false)
    private Float gradeSalary;

}
