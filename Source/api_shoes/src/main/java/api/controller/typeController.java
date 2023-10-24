package api.controller;

import api.entity.typeEntity;
import api.repository.typeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/type")
public class typeController {
    @Autowired
    typeRepository typeRepository;


    @PostMapping("/create")
    public ResponseEntity createType(@Valid typeEntity type){
        if(typeRepository.existsById(type.getId())){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id is already taken");
        }
        typeRepository.save(type);
        return ResponseEntity.status(HttpStatus.CREATED).body("success");
    }


}
