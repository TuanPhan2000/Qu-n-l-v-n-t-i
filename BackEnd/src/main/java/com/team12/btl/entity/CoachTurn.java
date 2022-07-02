package com.team12.btl.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "coach_turn")
public class CoachTurn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "passenger_amount", nullable = false)
    @Min(value = 0, message = "Số hành khách là số nguyên dương")
    private Integer passengerAmount;

    @Column(name = "ticket_price", nullable = false)
    @Min(value = 0, message = "Giá vé là số nguyên dương")
    private Float ticketPrice;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "grade_salary")
    private Float gradeSalary;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "coach_id",referencedColumnName = "id")
//    @NotBlank(message = "Xe khách không được để trống")
    private Coach coach;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "route_id",referencedColumnName = "id")
//    @NotBlank(message = "Tuyến đường không được để trống")
    private Route route;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "driver_id",referencedColumnName = "id")
//    @NotBlank(message = "Tài xế không được để trống")
    private Driver driver;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "driver_asistant_id",referencedColumnName = "id")
//    @NotBlank(message = "Phụ xe không được để trống")
    private Driver driverAsistant;

}
