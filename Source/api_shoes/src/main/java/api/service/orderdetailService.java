package api.service;

import api.DTO.orderdetailDTO;
import api.entity.customersEntity;
import api.repository.customersRepository;
import api.repository.orderdetailRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Component
public class orderdetailService {
    @Autowired
    orderdetailRepository orderdetailRepository;

    @Autowired
    customersRepository customersRepository;

    @Autowired
    ModelMapper modelMapper;

    public List getListOrderDetailCustomer(String userid){
        customersEntity customers = customersRepository.findByUsers_id(userid);
        List<orderdetailDTO> list = orderdetailRepository.listorderdetailcustomer(customers.getId()).stream().map(
                orderdetailEntity -> {
                    orderdetailDTO orderdetail = modelMapper.map(orderdetailEntity,orderdetailDTO.class);
                    return orderdetail;
                }
        ).collect(Collectors.toList());
        return list;
    }

    public List getListOrderDetailAdmin(){
        List<orderdetailDTO> list = orderdetailRepository.findAll().stream().map(
                orderdetailEntity -> {
                    orderdetailDTO orderdetail = modelMapper.map(orderdetailEntity,orderdetailDTO.class);
                    return orderdetail;
                }
        ).collect(Collectors.toList());
        return list;
    }







}
