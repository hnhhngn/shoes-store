package api.entity;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "role")
public class roleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private role_name name;


    public roleEntity(){}

    public roleEntity(role_name name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public role_name getName() {
        return name;
    }

//    public void setName(role_name name) {
//        this.name = name;
//    }
//
//    public Collection<api.entity.usersEntity> getUsersEntity() {
//        return usersEntity;
//    }
//
//    public void setUsersEntity(Collection<api.entity.usersEntity> usersEntity) {
//        this.usersEntity = usersEntity;
//    }
}
