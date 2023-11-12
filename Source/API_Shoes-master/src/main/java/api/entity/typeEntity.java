package api.entity;


import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Collection;

@Entity
@Table(name = "type")
public class typeEntity {

    @Id
    private String id;

    @NotBlank
    private String nametype;


    @OneToMany(mappedBy = "type")
    private Collection<repositoryEntity> repositoryEntities;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNammetype() {
        return nametype;
    }

    public void setNammetype(String nametype) {
        this.nametype = nametype;
    }
}
