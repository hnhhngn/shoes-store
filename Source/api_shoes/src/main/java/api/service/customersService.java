package api.service;

import api.payload.request.SignupRequest;
import api.DTO.customersDTO;
import api.DTO.usersDTO;
import api.entity.customersEntity;
import api.entity.usersEntity;
import api.payload.response.MessageResponse;
import api.repository.customersRepository;
import api.repository.usersRepository;
import com.restfb.types.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class customersService {
    @Autowired
    customersRepository customersRepository;

    @Autowired
    usersService usersService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    usersRepository usersRepository;

    @Autowired
    ModelMapper mapper;


    public int createcustomer(SignupRequest signRes,usersEntity user){
        // tạo customers
        String linkphotodefault = "https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1622470096048-avatar.png";
        customersEntity customersEntity = new customersEntity(signRes.getFirstname(),signRes.getLastname(),signRes.getAddress(),
                signRes.getPhone(),linkphotodefault,user);
        customersRepository.save(customersEntity);
        return  1;
    }


    public customersDTO getcustomers(String username){
        customersEntity customersEntity = customersRepository.findByUsername(username);
        usersEntity user = usersRepository.finduser(username);
        customersDTO customersDTO = null;
        if(customersEntity == null){
            return customersDTO;
        }
         customersDTO = mapper.map(customersEntity, api.DTO.customersDTO.class);
        customersDTO.setEmail(user.getEmail());
        return customersDTO;
    }


    public customersDTO updatecustomer(customersDTO customerDTO,String username){
        usersEntity usersEntity = usersRepository.finduser(username);
        customersEntity customersEntity = mapper.map(customerDTO, api.entity.customersEntity.class);
        customersEntity.setUsersEntitys(usersEntity);
        customersRepository.save(customersEntity);
        if(!customerDTO.getEmail().isEmpty()){
            usersEntity.setEmail(customerDTO.getEmail());
            usersRepository.save(usersEntity);
        }
        return customerDTO;
    }

    public int checkpassword(String username,String pass){
        boolean result = false;
        try {
            usersEntity user = usersRepository.finduser(username);
            result = encoder.matches(pass,user.getPassword());
        }catch (Exception e){
        }
        if(result){
            return 1;
        }
        return 0;
    }

    public Object changepassword(String username,String newpass){
        try {
            usersEntity user = usersRepository.finduser(username);
            user.setPassword(encoder.encode(newpass));
        }catch (Exception e){
        }
        MessageResponse mes = new MessageResponse("success");
        return mes;
    }

}
