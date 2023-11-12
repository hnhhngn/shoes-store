package api.service;

import api.DTO.productdetailDTO;
import api.DTO.productsDTO;
import api.DTO.shopcartDTO;
import api.entity.customersEntity;
import api.entity.productdetailEntity;
import api.entity.productsEntity;
import api.entity.shopcartEntity;
import api.repository.customersRepository;
import api.repository.productdetailRepository;
import api.repository.productsRepository;
import api.repository.shopcartRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Component
public class shopcartService {
    @Autowired
    shopcartRepository shopcartRepository;

    @Autowired
    customersService customersService;

    @Autowired
    productsRepository productsRepository;

    @Autowired
    productdetailRepository productdetailRepository;

    @Autowired
    customersRepository customersRepository;

    @Autowired
    ModelMapper modelMapper;


    public List getlistshopcart(String username){
        List<shopcartDTO> list = shopcartRepository.getlistshopcart(username).stream().map(
                shopcartEntity -> {
                    shopcartDTO shopcartsDTO = modelMapper.map(shopcartEntity,shopcartDTO.class);
                    shopcartsDTO.setCustomersid(shopcartEntity.getCustomers().getId());
                    productdetailDTO productdetailDTO = new productdetailDTO();
                    productdetailDTO.setId(shopcartEntity.getProductdetail().getId());
                    productdetailDTO.setProductid(shopcartEntity.getProductdetail().getProductsEntity().getId());
                    productdetailDTO.setSize(shopcartEntity.getProductdetail().getSize());
                    productdetailDTO.setInventory(shopcartEntity.getProductdetail().getInventory());
                    shopcartsDTO.setProductdetail(productdetailDTO);
                    return shopcartsDTO;
                }

        ).collect(Collectors.toList());
        return list;
    }


    public shopcartEntity saveshopcart(shopcartDTO shopcartsDTO,String username){
        shopcartEntity shopcartsEntity = null;
        customersEntity customersEntity = customersRepository.findByUsers_id(username);
        productdetailEntity  productdetailEntity  = productdetailRepository.findById(shopcartsDTO.getProductdetail().getId());
        if(productdetailEntity == null){
            return  shopcartsEntity;
        }

        shopcartsEntity = shopcartRepository.findbyAttribute(customersEntity.getId(),
                productdetailEntity.getId());
        if(shopcartsEntity != null){
            int total = shopcartsEntity.getQuantity() + shopcartsDTO.getQuantity();
            shopcartsEntity.setQuantity(total);
            shopcartEntity shopcart = shopcartRepository.save(shopcartsEntity);
            return shopcart;
        }
        shopcartsEntity = new shopcartEntity();
        shopcartsEntity.setCustomers(customersEntity);
        shopcartsEntity.setProductdetail(productdetailEntity);
        shopcartsEntity.setQuantity(shopcartsDTO.getQuantity());
        shopcartEntity shopcart = shopcartRepository.save(shopcartsEntity);
        return shopcart;
    }

    public shopcartEntity updateShopcart(shopcartDTO shopcartsDTO){
        shopcartEntity shopcartsEntity = shopcartRepository.findById(shopcartsDTO.getId());
        shopcartsEntity.setQuantity(shopcartsDTO.getQuantity());
        productdetailEntity productDetail = productdetailRepository.findById(shopcartsDTO.getProductdetail().getId());
        shopcartsEntity.setProductdetail(productDetail);
        shopcartEntity shopcart = shopcartRepository.save(shopcartsEntity);
        return shopcart;
    }


    public int deleteshopcart(shopcartDTO shopcartsDTO){
        shopcartEntity shopcartsEntity = shopcartRepository.findById(shopcartsDTO.getId());
        if(shopcartsEntity == null){
            return 0;
        }
        shopcartRepository.delete(shopcartsEntity);;
        return 1;
    }



}
