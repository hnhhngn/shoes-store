package api.repository;

import api.entity.ordersEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ordersRepository extends JpaRepository<ordersEntity, String> {

    ordersEntity findById(String id);

    @Query(value="select * from orders where customer_id = ?1 ",nativeQuery = true)
    List<ordersEntity> findListOrderCustomer(long customerid);

    Page<ordersEntity> findByStatus( ordersEntity.Status status ,Pageable pageable);

    Page<ordersEntity> findByIdAndStatus(String id, ordersEntity.Status status, Pageable pageable);

    List<ordersEntity> findByModifiedDateBetweenAndStatus(Date datefrom, Date dateto, ordersEntity.Status status);

    List<ordersEntity> findByCreatedDateBetweenAndStatus(Date datefrom, Date dateto, ordersEntity.Status status);

}
