package api.controller;

import api.DTO.wishlistDTO;
import api.entity.categoryEntity;
import api.service.wishlistService;
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
@RequestMapping("/api/wishlist")
public class wishlistController {
    @Autowired
    wishlistService wishlistService;

    @GetMapping("")
    public ResponseEntity getListWishlist(){
        String username = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }
        List<wishlistDTO> list = wishlistService.getListWishlist(username);
        if(list.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("wishlist not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @PostMapping("")
    public ResponseEntity createWishlist(@Valid @RequestBody wishlistDTO wishlistDTO){

        Boolean check = wishlistService.createWishlist(wishlistDTO);
        if(!check){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error when create");
        }
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

    @PostMapping("/delete")
    public ResponseEntity deleteWishlist(@Valid @RequestBody wishlistDTO wishlistDTO){

        Boolean check = wishlistService.deleteWishlist(wishlistDTO);
        if(!check){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error when delete");
        }
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

}
