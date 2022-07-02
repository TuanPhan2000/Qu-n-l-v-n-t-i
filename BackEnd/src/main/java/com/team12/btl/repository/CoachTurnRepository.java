package com.team12.btl.repository;

import com.team12.btl.entity.CoachTurn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface CoachTurnRepository extends JpaRepository<CoachTurn, Integer>, JpaSpecificationExecutor<CoachTurn> {

    CoachTurn findCoachTurnById(Integer Id);

    @Modifying
    int deleteCoachTurnById(Integer Id);


    @Query(value = "select ct.* from coach_turn ct, driver d, coach c, route r " +
            "where ct.driver_id=d.id and ct.coach_id=c.id and ct.route_id=r.id " +
            "and ct.ticket_price >= ?1 " +
            "and upper(d.name) like concat('%',upper(?2),'%') " +
            "and upper(c.plate) like concat('%',upper(?3),'%') " +
            "and upper(r.id) like concat('%',upper(?4),'%')", nativeQuery = true)
    List<CoachTurn> searchCoachTurn(String ticketPriceMin, String driverName, String coachPlate, String routeId);

    @Query(value = " select c.*, SUM( ct.passenger_amount * ct.ticket_price ) as revenue from coach c, coach_turn ct " +
            "where c.id = ct.coach_id " +
            "and ct.start_time >= ?1 " +
            "and ct.end_time <= ?2 group by c.id order by revenue desc", nativeQuery = true)
    List<Map> getRevenueCoachByTime(String startTime, String endTime);


    @Query(value = "select ct.* from coach_turn ct " +
            "WHERE " +
            "ct.coach_id = ?1 " +
            "and ct.start_time >= ?2 " +
            "and ct.end_time <= ?3", nativeQuery = true)
    List<CoachTurn> getListCoachTurnByIdCoachAndTime(String Id, String startTime, String endTime);

}
