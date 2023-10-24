package api.controller;

import api.DTO.orderdetailDTO;
import api.DTO.ordersDTO;
import api.service.orderdetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orderdetail")
public class orderdetailController {
    @Autowired
    orderdetailService orderdetailService;


    @GetMapping("/user")
    public ResponseEntity getListOrderCustomer(){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }

        List<orderdetailDTO> list = orderdetailService.getListOrderDetailCustomer(username);
        if(list.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/admin")
    public ResponseEntity getListOrderAdmin(){
        List<orderdetailDTO> list = orderdetailService.getListOrderDetailAdmin();
        if(list.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

}
