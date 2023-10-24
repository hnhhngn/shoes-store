package api.controller;

import api.DTO.ChangePassword;
import api.DTO.customersDTO;
import api.entity.roleEntity;
import api.entity.role_name;
import api.payload.response.MessageResponse;
import api.repository.roleRepository;
import api.service.customersService;
import api.service.sendMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/customers")
public class customersController {
    @Autowired
    customersService customersService;

    @Autowired
    roleRepository roleRepository;

    @GetMapping("")
    public ResponseEntity<Object> getcustomers(){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }

        customersDTO customersDTO =  customersService.getcustomers(username);
        if(customersDTO == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(customersDTO);
    }


    @PostMapping("")
    public ResponseEntity<Object> updatecustomers(@Valid @RequestBody customersDTO customerDTO){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }
        customersDTO customersDTO = customersService.updatecustomer(customerDTO,username);
        return ResponseEntity.status(HttpStatus.OK).body(customersDTO);
    }


    @PostMapping("/password")
    public ResponseEntity<Object> ChangePassword(@RequestBody ChangePassword changePassword){
        String username = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }

        int check = customersService.checkpassword(username,changePassword.getOldpassword());
        if(check == 0){
            MessageResponse mes = new MessageResponse("password incorrect");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mes);
        }
        return new ResponseEntity<Object>(customersService.changepassword(username,changePassword.getNewpassword()),HttpStatus.OK);
    }



}
