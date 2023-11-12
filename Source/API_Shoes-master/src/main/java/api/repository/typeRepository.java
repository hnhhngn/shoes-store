package api.repository;


import api.entity.typeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface typeRepository  extends JpaRepository<typeEntity, String> {

    Boolean existsById(String id);

    typeEntity findById(String id);

}
