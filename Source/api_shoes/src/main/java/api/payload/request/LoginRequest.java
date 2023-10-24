package api.payload.request;

import org.hibernate.service.spi.InjectService;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Size;

public class LoginRequest {

    @NotBlank
    @Size(min = 3,max = 50)
    private String username;

    @NotBlank
    @Size(min = 3,max = 50)
    private  String password;

    public LoginRequest() {
    }

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
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
}
