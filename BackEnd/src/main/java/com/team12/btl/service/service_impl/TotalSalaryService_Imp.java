package com.team12.btl.service.service_impl;



import com.team12.btl.entity.Driver;
import com.team12.btl.entity.TotalSalary;
import com.team12.btl.repository.DriverRepository;
import com.team12.btl.repository.TotalSalaryRepository;
import com.team12.btl.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;
@Service
@Transactional(rollbackFor = Exception.class)
public class TotalSalaryService_Imp {
    @Autowired
    TotalSalaryRepository totalSalaryRepository;
    @Autowired
    DriverRepository driverRepository;

    public List<Map> getCurrentMonthSalary(){
        LocalDate now = LocalDate.now();
        return totalSalaryRepository.getCurrentMonthSalary(now.getMonthValue(), now.getYear());
    }
    public List<TotalSalary> saveToDB(List<Map> totalSalaryList)throws Exception {
        //LocalDate now=LocalDate.now();
//        totalSalaryRepository.deleteCurrentMonth(now.getMonthValue(), now.getYear());
        LocalDateTime now = LocalDateTime.now();
        Calendar c = Calendar.getInstance();
        int dem=totalSalaryRepository.countTotalSalaryByMonthAndYear(now.getMonthValue(),now.getYear());
        if(dem>0){
            throw new Exception("Lỗi: Đã lưu bảng lương của tháng này");
        }
      //  else if(1==2) {
         else if(now.getHour()<23 ||now.getDayOfMonth()<c.getActualMaximum(Calendar.DAY_OF_MONTH) ) {
              throw new Exception("Lỗi: Chỉ được lưu vào CSDL sau 23h ngày cuối cùng của tháng");
          }else{
            List<TotalSalary> totalSalary=new ArrayList<>();

            for (Map t: totalSalaryList) {
                TotalSalary total=new TotalSalary();
                total.setMonth((int)t.get("month"));
                total.setYear((int)t.get("year"));
                total.setTotal(Float.parseFloat(t.get("total").toString()) );
                Driver d=driverRepository.findByIdAndActiveTrue((int)t.get("driver_id"));
                total.setDriver(d);
                totalSalary.add(total);
            }


            return totalSalaryRepository.saveAll(totalSalary);
        }


    }
    public List<TotalSalary> findTotalSalaryByMonthAndYear(Integer month, Integer year){
       return totalSalaryRepository.findTotalSalaryByMonthAndYear(month,year);
    }


}
