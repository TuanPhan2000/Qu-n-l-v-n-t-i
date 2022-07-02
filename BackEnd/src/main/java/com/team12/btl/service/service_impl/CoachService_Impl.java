package com.team12.btl.service.service_impl;

import com.team12.btl.entity.Coach;
import com.team12.btl.repository.CoachRepository;
import com.team12.btl.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class CoachService_Impl implements GeneralService<Coach> {
    @Autowired
    CoachRepository coachRepository;
    @Override
    public List<Coach> findAll() {
        return coachRepository.findByActiveIsTrue();
    }

    @Override
    public Coach findById(Integer id) {
        return coachRepository.findByIdAndActiveTrue(id);
    }

    @Override
    public Coach create(Coach coach) {
        coach.setActive(true);
        return  coachRepository.save(coach);
    }

    @Override
    public Coach update(Coach coach) {
        coach.setActive(true);
        return  coachRepository.save(coach);
    }


    @Override
    public int delete(Integer id) {
        return coachRepository.deleteCoach(id);
    }
    public List<Coach> searchCoach(Map<String, String> map){

        return coachRepository.searchCoach
                (map.get("id") != null ? map.get("id"):"",
                        map.get("plate") != null ? map.get("plate"):"",
                        map.get("model") != null ? map.get("model"):"",
                        map.get("manufacturer") != null ? map.get("manufacturer"):"",
                        map.get("capacity") != null ? map.get("capacity"):"",
                        map.get("yearsOfUse") != null ? map.get("yearsOfUse"):"",
                        map.get("lastMaintenanceDay") != null ? map.get("lastMaintenanceDay"):"");
    }

}
