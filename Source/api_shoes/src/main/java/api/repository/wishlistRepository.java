package api.repository;

import api.entity.customersEntity;
import api.entity.productsEntity;
import api.entity.wishlistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface wishlistRepository extends JpaRepository<wishlistEntity, Long> {

    wishlistEntity findById(long id);

    List<wishlistEntity> findByCustomers(customersEntity cuctomers);

    wishlistEntity findByCustomersAndAndProducts(customersEntity cuctomers, productsEntity products);
}
