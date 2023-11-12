package api.controller;

import api.entity.categoryEntity;
import api.service.categoryService;
import org.omg.CORBA.OBJ_ADAPTER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/category")
public class categoryController {
    @Autowired
    categoryService categoryService;

    @GetMapping("/get")
    public ResponseEntity getCategory(){
        List<categoryEntity> list = categoryService.getlistcategory();
        if(list.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("category not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @PostMapping("")
    public ResponseEntity createCategory(@Valid @RequestBody categoryEntity categoryEntitys){

        categoryEntity category = categoryService.createcategory(categoryEntitys);
        if(category == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id is already taken");
        }
        return ResponseEntity.status(HttpStatus.OK).body(category);
    }

    @PutMapping("")
    public ResponseEntity updateCategory(@Valid @RequestBody categoryEntity categoryEntitys){
        categoryEntity category = categoryService.updatecategory(categoryEntitys);
        return ResponseEntity.status(HttpStatus.OK).body(category);
    }

}
