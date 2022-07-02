package com.team12.btl.service.service_impl;

import com.team12.btl.entity.Route;
import com.team12.btl.repository.RouteRepository;
import com.team12.btl.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
public class RouteService_Impl implements GeneralService<Route> {

    @Autowired
    RouteRepository routeRepository;

    @Override
    public List<Route> findAll() {
        return routeRepository.findByActiveIsTrue();
    }

    @Override
    public Route findById(Integer id) {
        return routeRepository.findByIdAndActiveTrue(id);
    }

    @Override
    public Route create(Route route) {
        route.setActive(true);
        return routeRepository.save(route);
    }

    @Override
    public Route update(Route route) {
        route.setActive(true);
        return routeRepository.save(route);
    }

    @Override
    public int delete(Integer id) {
        return routeRepository.deleteRoute(id);
    }

    public List<Route> searchRoute(Map<String, String> map){

        return routeRepository.searchRoute
                        (map.get("id") != null ? map.get("id"):"",
                        map.get("pointOfDeparture") != null ? map.get("pointOfDeparture"):"",
                        map.get("destination") != null ? map.get("destination"):"",
                        map.get("length") != null ? map.get("length"):"",
                        map.get("complexity") != null ? map.get("complexity"):"");
    }


}
