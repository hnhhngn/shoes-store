package api.repository;

import api.entity.productdetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface productdetailRepository extends JpaRepository<productdetailEntity,Long> {

    @Query(value = "select * from productdetail where productid =?1  ",nativeQuery = true)
    List<productdetailEntity> findByProductid(long productid);

    productdetailEntity findById(long id);


}
