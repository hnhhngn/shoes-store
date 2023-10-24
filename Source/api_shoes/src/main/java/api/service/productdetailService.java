package api.service;

import api.repository.productdetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class productdetailService {
    @Autowired
    productdetailRepository productdetailRepository;


}
