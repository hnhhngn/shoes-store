package api.payload.request;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Size;
import java.util.Set;

public class SignupRequest {

//    @NotBlank
//    @Size(min = 5,max = 100)
//    private String username;

    @NotBlank
    @Size(min = 4,max = 100)
    private String password;


    @NotBlank
    @Size(min = 8,max = 50)
    @Email
    private String email;



    @NotBlank
    @Size(min = 2,max = 50)
    private String firstname;

    @NotBlank
    @Size(min = 2,max = 50)
    private String lastname;

    @NotBlank
    @Size(min = 3,max = 200)
    private String address;

    @Size(min = 9,max = 10 , message = "size not comfirm")
    private String phone;

    private Set<String> role;

//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<String> getRole() {
        return role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }
}
