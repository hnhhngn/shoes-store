package api.service;

import api.entity.categoryEntity;
import api.repository.categoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Component
public class categoryService {
    @Autowired
    categoryRepository categoryRepository;

    public Boolean checkid(long id){
        if(categoryRepository.existsById(id)){
            return  true;
        }
        return false;
    }


    public categoryEntity findOnecategory(long id){
        categoryEntity categoryEntity = categoryRepository.findById(id);
        return categoryEntity;
    }

    public List<categoryEntity> getlistcategory(){
        List<categoryEntity> list ;
        list = categoryRepository.findAll();
        return list;
    }

    public categoryEntity createcategory(categoryEntity categoryEntitys){
        categoryEntity category = null;
        if(categoryRepository.existsById(categoryEntitys.getId())){
            return  category;
        }
        category =  categoryRepository.save(categoryEntitys);
        return category;
    }

    public categoryEntity updatecategory(categoryEntity categoryEntity){
        categoryEntity category = categoryRepository.save(categoryEntity);
        return category;
    }

}
