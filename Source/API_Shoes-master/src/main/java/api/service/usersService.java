package api.service;

import api.DTO.usersDTO;
import api.config.ModelMapperConfig;
import api.entity.roleEntity;
import api.entity.role_name;
import api.entity.usersEntity;
import api.repository.roleRepository;
import api.repository.usersRepository;
import api.security.service.UserDetailsImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Component
public class usersService implements UserDetailsService {
    @Autowired
    usersRepository usersRepository;
    @Autowired
    roleRepository roleRepository;
    @Autowired
    ModelMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        usersEntity user = usersRepository.findByUsername(s).
                orElseThrow(() -> new UsernameNotFoundException("username not found with :"+s));
        System.out.println("user "+user.getUsername() +user.getRoles().toString());
        return UserDetailsImpl.build(user);
    }


    public boolean checkuser(String username){
        if(usersRepository.existsByUsername(username)){
            return true;
        }
        return false;
    }

    public usersDTO getusers(String username){
        usersDTO usersDTO =null;
        usersEntity user = usersRepository.finduser(username);
        if(user == null){
            return usersDTO;
        }
        usersDTO = mapper.map(user, api.DTO.usersDTO.class);

        usersDTO.setRolename(user.getRoles());
        return  usersDTO;
    }

}
