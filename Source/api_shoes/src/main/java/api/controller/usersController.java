package api.controller;

import api.DTO.usersDTO;
import api.entity.roleEntity;
import api.entity.role_name;
import api.entity.usersEntity;
import api.repository.roleRepository;
import api.repository.usersRepository;
import api.service.sendMailService;
import api.service.usersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class usersController {
    @Autowired
    usersService usersService;

    @Autowired
    sendMailService sendMailService;

    @Autowired
    api.repository.usersRepository usersRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    api.repository.roleRepository roleRepository;

    @GetMapping("")
       public ResponseEntity<Object> getusers(){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }

            usersDTO usersDTO = usersService.getusers(username);
            if(usersDTO == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
            }
            return ResponseEntity.status(HttpStatus.OK).body(usersDTO);
        }

    @PostMapping("/create")
    public ResponseEntity<Object> createUser(@RequestBody usersDTO user){
        if(usersService.checkuser(user.getUsername())){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("username is already in use");
        }
        usersEntity users = new usersEntity();
        users.setUsername(user.getUsername());
        users.setPassword(encoder.encode(user.getPassword()));
        users.setEmail(user.getEmail());
        users.setName(user.getName());
        Set<roleEntity> roleEntities = new HashSet<>();
        roleEntity userRoleEntity = roleRepository.findByName(role_name.ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roleEntities.add(userRoleEntity);
        users.setRoles(roleEntities);
        usersRepository.save(users);
        return ResponseEntity.status(HttpStatus.CREATED).body("success");
    }



    @PostMapping("/mail/{mailto}")
    public ResponseEntity<Object> getusers(@PathVariable String mailto) throws MessagingException {
        sendMailService.sendHtmlWelcomeEmail(mailto+"@gmail.com","welcome");

        return ResponseEntity.status(HttpStatus.OK).body("success");
    }


}
