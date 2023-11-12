package api.service;

import api.entity.productdetailEntity;
import api.repository.productdetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class productdetailService {
    @Autowired
    productdetailRepository productdetailRepository;

    public boolean checkInventory(long id, int quan) {
        productdetailEntity productdetail = productdetailRepository.findById(id);
        if (quan > productdetail.getInventory()) {
            return false;
        }
        return true;
    }
}
