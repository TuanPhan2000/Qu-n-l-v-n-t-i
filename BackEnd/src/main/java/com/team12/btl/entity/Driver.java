package com.team12.btl.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.sql.Date;

@Entity
@Table(name = "driver")
@Data
public class Driver implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @NotBlank(message = "Tên không được trống")
    private String name;

    @Column(name = "id_card")
    @NotBlank(message = "Số thẻ căn cước không được trống")
    private String idCard;

    @Column(name = "driving_license_code")
    @NotBlank(message = "Mã số bằng lái không được trống")
    private String drivingLicenseCode;

    @Column(name = "type_of_license")
    @NotBlank(message = "Loại bằng lái không được trống")
    private String typeOfLicense;

    @Column(name = "address")
    @NotBlank(message = "Địa chỉ không được trống")
    private String address;

    @Column(name = "birthday", nullable = false)
    private Date birthday;

    @Column(name = "experience", nullable = false)
    @Min(value=0, message="Thâm niên không âm")
    private Integer experience;

    @Column(name = "is_active")
    private Boolean active;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fixed_salary_id",referencedColumnName = "id")
    private FixedSalary fixedSalary;

}
