package api.repository;

import api.entity.customersEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface customersRepository extends JpaRepository<customersEntity,Long> {
//    customersEntity findByUsers_id(String users_id);
    customersEntity findById(Long id);

    @Query(value = "select * from customers where users_id = (select id from users where username = ?1)",nativeQuery = true)
    customersEntity findByUsers_id(String name);

    @Query(value = "select * from customers where users_id = (select id from users where username = ?1)",nativeQuery = true)
    customersEntity findByUsername(String username);
}
