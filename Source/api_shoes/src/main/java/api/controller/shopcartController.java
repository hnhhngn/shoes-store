package api.controller;

import api.DTO.shopcartDTO;
import api.entity.shopcartEntity;
import api.service.shopcartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/shopcart")
public class shopcartController {
    @Autowired
    shopcartService shopcartService;


    @GetMapping("")
    public ResponseEntity getListShopcart(){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }

        List<shopcartDTO> list = shopcartService.getlistshopcart(username);
        if(list.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("shopcart not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }


    @PostMapping("/create")
    public ResponseEntity saveShopcart(@Valid @RequestBody shopcartDTO shopcarts){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }
        shopcartEntity shopcart = shopcartService.saveshopcart(shopcarts,username);
        if(shopcart == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("shopcart not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(shopcarts);
    }

    @PutMapping("")
    public ResponseEntity updateShopcart(@Valid @RequestBody shopcartDTO shopcarts){
        shopcartEntity shopcart = shopcartService.updateShopcart(shopcarts);
        if(shopcart == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("shopcart not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(shopcarts);
    }


    @PostMapping("/delete")
    public ResponseEntity deleteShopcart(@Valid @RequestBody shopcartDTO shopcarts){
        int check = shopcartService.deleteshopcart(shopcarts);
        if(check == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("shopcart not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Susscess");
    }



}
