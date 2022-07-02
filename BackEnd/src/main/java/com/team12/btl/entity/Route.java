package com.team12.btl.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Table(name = "route")
@Data
public class Route implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "point_of_departure")
    @NotBlank(message = "Điểm xuất phát không được trống")
    private String pointOfDeparture;

    @Column(name = "destination")
    @NotBlank(message = "Điểm đến không được trống")
    private String destination;

    @Column(name = "length", nullable = false)
    @Min(value=0, message="Độ dài không âm")
    private Float length;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "complexity_id",referencedColumnName = "complexity", nullable = false)
    @Column(name = "complexity_id", nullable = false)
    private Integer complexity;

    @Column(name = "is_active")
    private Boolean active;

}
