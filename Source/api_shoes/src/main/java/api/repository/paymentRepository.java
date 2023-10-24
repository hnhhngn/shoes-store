package api.repository;

import api.entity.paymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface paymentRepository extends JpaRepository<paymentEntity,Long> {
    paymentEntity findById(long id);
    paymentEntity findByName(String name);
}
