package com.team12.btl.service.service_impl;

import com.team12.btl.entity.Driver;
import com.team12.btl.entity.FixedSalary;
import com.team12.btl.repository.FixedSalaryRepository;
import com.team12.btl.repository.RouteRepository;
import com.team12.btl.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class FixedSalaryService_Impl implements GeneralService<FixedSalary> {
    @Autowired
    FixedSalaryRepository fixedSalaryRepository;
    @Override
    public List<FixedSalary> findAll() {
        return fixedSalaryRepository.findAll();
    }

    @Override
    public FixedSalary findById(Integer id) {
        return null;
    }

    @Override
    public FixedSalary create(FixedSalary fixedSalary) {
        return null;
    }

    @Override
    public FixedSalary update(FixedSalary fixedSalary) {
        return null;
    }

    @Override
    public int delete(Integer id) {
        return 0;
    }


}
