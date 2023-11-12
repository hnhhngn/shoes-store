package api.repository;

import api.entity.usersEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface usersRepository extends JpaRepository<usersEntity,Long> {

   Boolean existsByEmail(String email);

   Optional<usersEntity> findByUsername(String username);

   @Query(value = "select * from users where username = ?1",nativeQuery = true)
   usersEntity finduser(String username);

   Boolean existsByUsername(String username);

}
