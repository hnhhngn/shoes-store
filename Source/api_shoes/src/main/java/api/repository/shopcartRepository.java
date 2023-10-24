package api.repository;

import api.entity.shopcartEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.util.StringUtils;

import java.util.List;

public interface shopcartRepository extends JpaRepository<shopcartEntity, Long > {

    @Query(value = "select * from shopcart where customersid = ?1 and productdetailid = ?2",nativeQuery = true)
    shopcartEntity findbyAttribute(long customerid, long productid);

    @Query(value = "select * from shopcart where customersid = " +
            "(select id from customers where users_id = (select id from users where username = ?1)) ",nativeQuery= true)
    List<shopcartEntity> getlistshopcart(String username);

    shopcartEntity findById(long id);


}
