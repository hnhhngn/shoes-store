package api.entity;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(	name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class usersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Id
    @NotBlank
    @Size(min = 5,max = 100)
    private String username;

    @NotBlank
    @Size(min = 4,max = 100)
    private String password;

    @NotBlank
    @Size(min = 5,max = 100)
    private String name;


    @Size(max = 50)
    @Email
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<roleEntity> roles = new HashSet<>();

    @OneToOne(mappedBy = "usersEntitys")
    private customersEntity customersEntitys;

    public usersEntity() {
    }

    public usersEntity(String username, String name, String email , String password) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<roleEntity> getRoles() {
        return roles;
    }

    public void setRoles(Set<roleEntity> roles) {
        this.roles = roles;
    }

    public customersEntity getCustomersEntitys() {
        return customersEntitys;
    }

    public void setCustomersEntitys(customersEntity customersEntitys) {
        this.customersEntitys = customersEntitys;
    }
}
