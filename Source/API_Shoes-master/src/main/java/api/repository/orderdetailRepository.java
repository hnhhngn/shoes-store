package api.repository;

import api.entity.orderdetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface orderdetailRepository extends JpaRepository<orderdetailEntity, Long> {

        @Query(value="select * from orderdetail where order_id in ( select id from orders where customer_id = ?1 ) ",nativeQuery = true)
        List<orderdetailEntity> listorderdetailcustomer(long customerid);

        @Query(value="select * from orderdetail where order_id = ?1 ",nativeQuery = true)
        orderdetailEntity findOrderdetail(String order_id);




}
