package api.controller;

import api.DTO.productsDTO;
import api.service.productsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class productsController {
    @Autowired
    productsService productsService;

    @GetMapping("/id/{productsid}")
    public ResponseEntity getproduct(@PathVariable long productsid){

        productsDTO productDTO = productsService.getproduct(productsid);
        if(productDTO == null){
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found") ;
        }
        return ResponseEntity.status(HttpStatus.OK).body(productDTO);
    }


    @GetMapping("/page")
    public ResponseEntity getListProducByStatusPagination(
         @RequestParam(name = "page", defaultValue = "1") int page,
         @RequestParam(name = "size", defaultValue = "8") int size,
         @RequestParam(name = "sort", defaultValue = "createddate") String sortType,
         @RequestParam(name = "order", defaultValue = "ASC") String orderby,
         @RequestParam(name = "status", defaultValue = "ACTIVE") String status,
         @RequestParam(name = "category", required = false) Long categoryid,
         @RequestParam(name = "title") Optional<String> title){

        return ResponseEntity.ok().body(productsService.productPagination(page,size,sortType
                ,categoryid,orderby,status,title));
    }


    @PostMapping("")
    public ResponseEntity createproduct(@Valid @RequestBody productsDTO product){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }
        productsDTO productDTO = productsService.saveproducts(product,username);
        return ResponseEntity.status(HttpStatus.CREATED).body(productDTO);
    }

    @PutMapping("")
    public ResponseEntity updateproduct(@Valid @RequestBody productsDTO product){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }
        productsDTO productDTO = productsService.saveproducts(product,username);
        return ResponseEntity.status(HttpStatus.CREATED).body(productDTO);
    }

    @GetMapping("/page/sale/{size}")
    public ResponseEntity getProductSale(@PathVariable int size){
        List<productsDTO> list = productsService.getProductSale(size);
        if(list.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/page/random")
    public ResponseEntity getlistproductMaybe(
            @RequestParam(name = "limit", defaultValue = "6") int limit,
            @RequestParam(name = "category", required = false) Long categoryid){

        return ResponseEntity.ok().body(productsService.getProductMaybe(categoryid,limit));
    }

}
