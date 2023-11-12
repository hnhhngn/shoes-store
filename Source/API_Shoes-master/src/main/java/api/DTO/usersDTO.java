package api.DTO;

import api.entity.roleEntity;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Size;
import java.util.Set;

public class usersDTO {

    @NotBlank
    @Size(min = 5,max = 100)
    private String username;

    @NotBlank
    @Size(min = 4,max = 100)
    private String password;

    @NotBlank
    @Size(min = 5,max = 100)
    private String name;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 2,max = 10)
    private Set<roleEntity> rolename;


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

    public Set<roleEntity> getRolename() {
        return rolename;
    }

    public void setRolename(Set<roleEntity> rolename) {
        this.rolename = rolename;
    }
}
