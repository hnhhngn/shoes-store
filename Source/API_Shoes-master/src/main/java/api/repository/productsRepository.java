package api.repository;

import api.entity.discountEntity;
import api.entity.productsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface productsRepository extends JpaRepository<productsEntity,Long > {

    productsEntity findById(long id);

    Page<productsEntity> findByStatusAndCategory_idAndNameContaining(productsEntity.Status status,
              Long categoryid,String name, Pageable pageable);

    Page<productsEntity> findByStatusAndCategory_idAndId(productsEntity.Status status,
              Long categoryid,Long id , Pageable pageable);

    Page<productsEntity> findByStatusAndNameContaining(productsEntity.Status status,String name, Pageable pageable);

    Page<productsEntity> findByStatusAndId(productsEntity.Status status,Long id , Pageable pageable);

    Page<productsEntity> findByStatusAndCategory_id(productsEntity.Status status,Long id, Pageable pageable);

    List<productsEntity> findByStatusAndCategory_id(productsEntity.Status status,Long id);

    Page<productsEntity> findByStatusAndDiscountEntitys(productsEntity.Status status,discountEntity discountEntitys,Pageable pageable);

    Page<productsEntity> findByStatus(productsEntity.Status status, Pageable pageable);

}
