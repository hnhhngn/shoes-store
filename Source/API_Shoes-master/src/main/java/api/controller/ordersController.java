package api.controller;

import api.DTO.ResultPageOrder;
import api.DTO.infoOrderDTO;
import api.DTO.ordersDTO;
import api.service.ordersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.text.ParseException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/orders")
public class ordersController {
    @Autowired
    ordersService ordersService;

    @GetMapping("/user")
    public ResponseEntity getListOrderCustomer(){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }

        List<ordersDTO> list = ordersService.getListOrderCustomer(username);
        if(list.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }
        Collections.reverse(list);
            return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/admin/page")
    public ResponseEntity getListOrderPageAdmin(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "8") int size,
            @RequestParam(name = "sort", defaultValue = "createdDate") String sortType,
            @RequestParam(name = "order", defaultValue = "ASC") String orderBy,
            @RequestParam(name = "title") Optional<String> title,
            @RequestParam(name = "type") Optional<String> type){
        ResultPageOrder resultPage = ordersService.getListOrderPageAdmin(page,size,title,sortType,orderBy,type);
        if(resultPage.getListResult().size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(resultPage);
    }


    @PostMapping("/create")
    public ResponseEntity createOrder(@Valid @RequestBody infoOrderDTO infoOrder) throws MessagingException {
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }

        if(ordersService.createOrders(infoOrder,username)){
           return ResponseEntity.status(HttpStatus.CREATED).body("success");
       }
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
    }



    @PostMapping("/cancel")
    public ResponseEntity cancelOrder(@Valid @RequestBody ordersDTO order){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }

        Boolean check = ordersService.cancelOrder(order,username);
        if(check){
            return ResponseEntity.status(HttpStatus.OK).body("success");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
    }


    @PostMapping("/accept")
    public ResponseEntity acceptOrder(@Valid @RequestBody ordersDTO order){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }

        Boolean check = ordersService.acceptOrder(order,username);
        if(check){
            return ResponseEntity.status(HttpStatus.OK).body("success");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
    }

    @PostMapping("/confirm")
    public ResponseEntity confirmOrder(@Valid @RequestBody ordersDTO order){
        String username = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        }

        Boolean check = ordersService.confirmOrder(order,username);
        if(check){
            return ResponseEntity.status(HttpStatus.OK).body("success");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
    }

    @GetMapping("/doanhthu")
    public ResponseEntity DoanhThu(
            @RequestParam(name = "mode") String mode,
            @RequestParam(name = "id") Long idpro,
            @RequestParam(name = "datefrom") String datefrom,
            @RequestParam(name = "dateto") String dateto) throws ParseException {

        Object object =  ordersService.DoanhThu(mode.toUpperCase(),idpro,datefrom,dateto);
        return ResponseEntity.status(HttpStatus.OK).body(object);
    }

    @GetMapping("/ttdonhang")
    public ResponseEntity TinhTrangDonHang(@RequestParam(name = "mode") String mode,
                                           @RequestParam(name = "id") Long idpro,
                                           @RequestParam(name = "datefrom") String datefrom,
                                           @RequestParam(name = "dateto") String dateto) throws ParseException {
        Object object =  ordersService.tinhTrangDonHang(mode.toUpperCase(),idpro,datefrom,dateto);
        return ResponseEntity.status(HttpStatus.OK).body(object);
    }

}
