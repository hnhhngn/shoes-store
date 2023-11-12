package api.repository;

import api.entity.imageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface imageRepository extends JpaRepository<imageEntity, Long> {
    @Query(value = "select * from image where productid =?1  ",nativeQuery = true)
    List<imageEntity> findByProductid(long productid);

}
