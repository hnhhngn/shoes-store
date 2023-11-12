package api.repository;

import api.entity.categoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface categoryRepository extends JpaRepository<categoryEntity,Long> {

    categoryEntity findById(Long id);

    Boolean existsById(Long id);

    categoryEntity findByName(String name);

}
