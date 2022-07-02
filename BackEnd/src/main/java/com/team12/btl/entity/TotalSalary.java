package com.team12.btl.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "total_salary")
@Data
public class TotalSalary implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "total", nullable = false)
    private Float total;

    @Column(name = "month", nullable = false)
    private Integer month;

    @Column(name = "year", nullable = false)
    private Integer year;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "driver_id",referencedColumnName = "id")
    private Driver driver;

}
