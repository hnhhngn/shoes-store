package api.service;

import api.DTO.imageDTO;
import api.entity.imageEntity;
import api.entity.productsEntity;
import api.repository.imageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public class imageService {
    @Autowired
    imageRepository imageRepository;

//    public List getlistimageofproduct(){
//        List<imageEntity> list = imageRepository.findAll();
//
//    }

    public void createimage(List<imageDTO> list, productsEntity product){


    }


}
