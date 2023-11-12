package api.controller;

import api.DTO.productdetailDTO;
import api.DTO.shopcartDTO;
import api.entity.shopcartEntity;
import api.payload.response.MessageResponse;
import api.service.productdetailService;
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

    @Autowired
    productdetailService productdetailService;

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
        // Check input
        String sErrorCode = validateupdateShopcart(shopcarts);
        if (!sErrorCode.isEmpty())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(sErrorCode));
        }

        shopcartEntity shopcart = shopcartService.updateShopcart(shopcarts);
        if(shopcart == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("shopcart not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(shopcarts);
    }

    private String validateupdateShopcart(shopcartDTO shopcarts)
    {
        if (shopcarts.getQuantity() <= 0) {
            return "ERR_QUAN_E001";
        } else if (!productdetailService.checkInventory(shopcarts.getProductdetail().getId(), shopcarts.getQuantity())) {
            return "ERR_QUAN_E002";
        } else if (shopcarts.getProductdetail().getSize() < 35 || shopcarts.getProductdetail().getSize() > 45) {
            return "ERR_SIZE_E001";
        } else {
            return "";
        }
    }

    private boolean isNumeric(String str) {
        try {
            Double.parseDouble(str);
            return true;
        } catch(NumberFormatException e){
            return false;
        }
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
