package com.team12.btl.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "fixed_salary")
public class FixedSalary implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "grade", nullable = false)
    private Float grade;

    @Column(name = "basic_salary", nullable = false)
    private Float basicSalary;

}
