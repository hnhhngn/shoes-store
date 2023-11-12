package api.service;

import api.entity.discountEntity;
import api.repository.discountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public class discountService {
    @Autowired
    discountRepository discountRepository;

    public discountEntity getDiscount(String id){
        return discountRepository.findById(id);
    }

    public List getListDiscount(){
        List<discountEntity> list ;
        list = discountRepository.findAll();
        return list;
    }

    public discountEntity createDiscount(discountEntity discountEntitys){
        discountEntity discount = null;
        if(discountRepository.existsById(discountEntitys.getId())){
            return discount;
        }
        discount = discountRepository.save(discountEntitys);
        return discount;
    }

    public discountEntity updateDiscount(discountEntity discountEntitys){
        discountEntity discount = null;
        if(discountRepository.existsById(discountEntitys.getId())){
            discount = discountRepository.save(discountEntitys);
            return discount;
        }
        return discount;
    }


}
