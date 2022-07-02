package com.team12.btl.service.service_impl;

import com.team12.btl.entity.User;
import com.team12.btl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(rollbackFor = Exception.class)
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    MailService mailService;



    public User update(Map<String, String> data) throws Exception {
        User user1 = userRepository.findUserByUsername(data.get("username")).get();
        if (data.get("password") != null && !data.get("password").equals("")) {
            if (!bCryptPasswordEncoder.matches(data.get("password"),user1.getEncryptedPassword())) {
                throw new Exception("Mật khẩu không đúng");
            }
            user1.setEncryptedPassword(bCryptPasswordEncoder.encode(data.get("newPassword")));
        }
        user1.setEmail(data.get("email")!=null ? data.get("email") : user1.getEmail());
        return userRepository.save(user1);
    }

    public User getInfoByUserName(String username){
        return userRepository.findUserByUsername(username).get();
    }

    public boolean resetPassword(String username) throws Exception {
        Optional<User> user = userRepository.findUserByUsername(username);
        if( user.isPresent()){
            String password = generatePassword();
            if(mailService.sendEmail(user.get().getEmail(),"Reset password",password)) {
                user.get().setEncryptedPassword(bCryptPasswordEncoder.encode(password));
                userRepository.save(user.get());
                return true;
            }else {
                throw new Exception("Có lỗi xảy ra, vui lòng thử lại sau");
            }
        }else {
            throw new Exception("Tài khoản không tồn tại");
        }
    }

    public String generatePassword(){
        return UUID.randomUUID().toString()+"I123@";
    }



}
