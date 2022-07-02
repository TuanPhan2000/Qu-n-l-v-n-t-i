package com.team12.btl.service.service_impl;

import com.team12.btl.entity.Coach;
import com.team12.btl.entity.CoachTurn;
import com.team12.btl.entity.Complexity;
import com.team12.btl.entity.Route;
import com.team12.btl.repository.CoachRepository;
import com.team12.btl.repository.CoachTurnRepository;
import com.team12.btl.repository.ComplexityRepository;
import com.team12.btl.repository.RouteRepository;
import com.team12.btl.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
public class CoachTurnService_Impl implements GeneralService<CoachTurn> {
    @Autowired
    CoachTurnRepository coachTurnRepository;
    @Autowired
    ComplexityRepository complexityRepository;
    @Autowired
    RouteRepository routeRepository;
    @Autowired
    CoachRepository coachRepository;


    @Override
    public List<CoachTurn> findAll() {
        return coachTurnRepository.findAll();
    }

    @Override
    public CoachTurn findById(Integer id) {
        return coachTurnRepository.findCoachTurnById(id);
    }

    @Override
    public CoachTurn create(CoachTurn coachTurn) throws Exception {

        Coach coach = coachRepository.getById(coachTurn.getCoach().getId());
        System.out.println("coach:"+coach.toString());
        System.out.println(coachTurn.getPassengerAmount() +"--"+ (coach.getCapacity() - 2));

        if (!coachTurn.getDriver().getId().equals(coachTurn.getDriverAsistant().getId()) &&
                coachTurn.getStartTime().isBefore(coachTurn.getEndTime()) &&
                coachTurn.getPassengerAmount() <= coach.getCapacity() - 2) {
            Route route = routeRepository.findByIdAndActiveTrue(coachTurn.getRoute().getId());
            Complexity complexity = complexityRepository.getById(route.getComplexity());
            coachTurn.setGradeSalary(complexity.getGradeSalary());
            return coachTurnRepository.save(coachTurn);
        } else if (coachTurn.getDriver().getId().equals(coachTurn.getDriverAsistant().getId())) {
            throw new Exception("Tài xế và phụ xe không thể là cùng 1 người");
        } else if (!coachTurn.getStartTime().isBefore(coachTurn.getEndTime())) {
            throw new Exception("Thời gian bắt đầu phải trước thời gian kết thúc");
        } else {
            throw new Exception("Số hành khách phải nhỏ hơn số ghế trừ 2");
        }
    }


    @Override
    public CoachTurn update(CoachTurn coachTurn) throws Exception {
        LocalDateTime now = LocalDate.now().atStartOfDay();
        LocalDateTime first = now.with(TemporalAdjusters.firstDayOfMonth());
        LocalDateTime last = now.with(TemporalAdjusters.lastDayOfMonth());

        if (coachTurn.getEndTime().isAfter(first.minusDays(1)) && coachTurn.getEndTime().isBefore(last.plusDays(1))) {
            Coach coach = coachRepository.findById(coachTurn.getCoach().getId()).get();
            if (!coachTurn.getDriver().getId().equals(coachTurn.getDriverAsistant().getId()) &&
                    coachTurn.getStartTime().isBefore(coachTurn.getEndTime()) &&
                    coachTurn.getPassengerAmount() <= coach.getCapacity() - 2) {
                Route route = routeRepository.findByIdAndActiveTrue(coachTurn.getRoute().getId());
                Complexity complexity = complexityRepository.findById(route.getComplexity()).get();
                coachTurn.setGradeSalary(complexity.getGradeSalary());
                return coachTurnRepository.save(coachTurn);
            } else if (coachTurn.getDriver().getId().equals(coachTurn.getDriverAsistant().getId())) {
                throw new Exception("Tài xế và phụ xe không thể là cùng 1 người");
            } else if (!coachTurn.getStartTime().isBefore(coachTurn.getEndTime())) {
                throw new Exception("Thời gian bắt đầu phải trước thời gian kết thúc");
            } else {
                throw new Exception("Số hành khách phải nhỏ hơn số ghế trừ 2");
            }
        } else {
            throw new Exception("Chỉ được chỉnh sửa chuyến xe trong tháng");
        }
    }

    @Override
    public int delete(Integer id) throws Exception {
        CoachTurn coachTurn = coachTurnRepository.getById(id);
        LocalDateTime now = LocalDate.now().atStartOfDay();
        LocalDateTime first = now.with(TemporalAdjusters.firstDayOfMonth());
        LocalDateTime last = now.with(TemporalAdjusters.lastDayOfMonth());
        if (coachTurn.getEndTime().isAfter(first.minusDays(1)) && coachTurn.getEndTime().isBefore(last.plusDays(1))) {
            return coachTurnRepository.deleteCoachTurnById(id);
        } else {
            throw new Exception("Chỉ được xoá chuyến xe trong tháng");
        }
    }

    public List<CoachTurn> searchCoachTurn(Map<String, String> map) {
        return coachTurnRepository.searchCoachTurn(
                map.get("ticketPriceMin") != null ? map.get("ticketPriceMin") : ""
                , map.get("driverName") != null ? map.get("driverName") : ""
                , map.get("coachPlate") != null ? map.get("coachPlate") : ""
                , map.get("routeId") != null ? map.get("routeId") : ""
        );
    }

    public List<CoachTurn> getListCoachTurnByIdCoachAndTime(Map<String, String> map) {
        return coachTurnRepository.getListCoachTurnByIdCoachAndTime(map.get("id"),
                map.get("startTime"),
                map.get("endTime"));
    }

    public List<Map> getRevenueCoachByTime(Map<String, String> map) {
        return coachTurnRepository.getRevenueCoachByTime(map.get("startTime"), map.get("endTime"));
    }
}
