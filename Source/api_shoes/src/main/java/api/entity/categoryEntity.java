package api.entity;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.CreatedBy;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name="catogory")
public class categoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @NotBlank
    @Size(min = 3,max = 50)
    private String name;

//    @NotBlank
    @Size(min = 5,max = 500)
    private String description;

    @OneToMany(mappedBy = "category" , fetch = FetchType.LAZY)
    private Collection<productsEntity> productsEntities;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
