package api.service;

import api.DTO.wishlistDTO;
import api.entity.customersEntity;
import api.entity.productsEntity;
import api.entity.wishlistEntity;
import api.repository.customersRepository;
import api.repository.productsRepository;
import api.repository.wishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Component
public class wishlistService {
    @Autowired
    wishlistRepository wishlistRepository;

    @Autowired
    customersRepository customersRepository;

    @Autowired
    productsRepository productsRepository;


    public List<wishlistDTO> getListWishlist(String username){
        customersEntity customersEntity = customersRepository.findByUsers_id(username);
        List<wishlistDTO> list = wishlistRepository.findByCustomers(customersEntity).stream().map(
                wishlistEntity -> {
                    wishlistDTO wishlistDTO = new wishlistDTO();
                    wishlistDTO.setId(wishlistEntity.getId());
                    wishlistDTO.setCustomerid(wishlistEntity.getCustomers().getId());
                    wishlistDTO.setProductid(wishlistEntity.getProducts().getId());
                    return  wishlistDTO;
                }
        ).collect(Collectors.toList());


        return  list;
    }

    public boolean createWishlist(wishlistDTO wishlistDTO){
        wishlistDTO wishlistdto = null;
        customersEntity customers = customersRepository.findById(wishlistDTO.getCustomerid());
        if(customers == null){
            return  false;
        }
         productsEntity product = productsRepository.findById(wishlistDTO.getProductid());
        if(product == null){
            return  false;
        }
        wishlistEntity wishlist = wishlistRepository.findByCustomersAndAndProducts(customers,product);
        if(wishlist != null){
            return  false;
        }

        wishlist = new wishlistEntity();
        wishlist.setCustomers(customers);
        wishlist.setProducts(product);
        wishlistRepository.save(wishlist);
        return  true;
    }

    public boolean deleteWishlist(wishlistDTO wishlistDTO){
        wishlistDTO wishlistdto = null;
        wishlistEntity wishlist = wishlistRepository.findById(wishlistDTO.getId());
        if(wishlist == null){
            return  false;
        }
        wishlistRepository.delete(wishlist);
        return  true;
    }

}
