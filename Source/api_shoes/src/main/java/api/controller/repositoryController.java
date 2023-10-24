package api.controller;

import api.DTO.ResultPageOrder;
import api.DTO.ResultPageRepository;
import api.DTO.repositoryDTO;
import api.entity.repositoryEntity;
import api.service.repositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/repository")
public class repositoryController {
    @Autowired
    repositoryService repositoryService;

    @GetMapping("/list")
    public ResponseEntity getListRepository(){
        List<ResponseEntity> list = repositoryService.getListRepository();
        if(list.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/admin/page")
    public ResponseEntity getListRepositoryPageAdmin(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "8") int size,
            @RequestParam(name = "sort", defaultValue = "datecreated") String sortType,
            @RequestParam(name = "order", defaultValue = "ASC") String orderBy,
            @RequestParam(name = "title") Optional<String> title,
            @RequestParam(name = "type") Optional<String> type){
        ResultPageRepository resultPage = repositoryService.getListRepositoryPageAdmin(page,size,title,sortType,orderBy,type);
        if(resultPage.getListResult().size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(resultPage);
    }

     @PostMapping("/create")
     public ResponseEntity createRepository(@Valid @RequestBody repositoryDTO repositoryDTO){
         String username = "";
         Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
         if (principal instanceof UserDetails) {
             username = ((UserDetails)principal).getUsername();
         }
         repositoryDTO repository = repositoryService.createRepository(repositoryDTO,username);
        if(repository== null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(repository);
     }


    @PutMapping("/update")
    public ResponseEntity updateRepository(@Valid @RequestBody repositoryDTO repositoryDTO){
        repositoryDTO repository = repositoryService.updateRepository(repositoryDTO);
        if(repository== null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(repository);
    }


    @GetMapping("/nhaphang")
    public ResponseEntity NhapHang(
            @RequestParam(name = "mode") String mode,
            @RequestParam(name = "id") Long idpro,
            @RequestParam(name = "datefrom") String datefrom,
            @RequestParam(name = "dateto") String dateto ) throws ParseException {

        Object object =  repositoryService.slNhapHang(mode.toUpperCase(),idpro,datefrom,dateto);
        return ResponseEntity.status(HttpStatus.OK).body(object);
    }

}
