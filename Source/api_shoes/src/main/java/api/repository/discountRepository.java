package api.repository;

import api.entity.discountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface discountRepository extends JpaRepository<discountEntity,String> {

    Boolean existsById(String id);

    discountEntity findById(String id);

}
