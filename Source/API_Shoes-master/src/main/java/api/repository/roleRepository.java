package api.repository;

import api.entity.roleEntity;
import api.entity.role_name;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface roleRepository  extends JpaRepository<roleEntity,Long> {

    Optional<roleEntity> findByName(role_name name);

    @Query(value = "select * from role where name =?1",nativeQuery = true)
    roleEntity find1(String name);

}
