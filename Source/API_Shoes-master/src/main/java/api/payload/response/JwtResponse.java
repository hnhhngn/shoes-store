package api.payload.response;

import java.util.List;

public class JwtResponse {
    private long id;

    private String username;

     private String email;

    private List<String> roles;

    private  String type = "Bearer";

    private String token;



    public JwtResponse(long id, String username, String email, List<String> roles,String accesstoken) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.token = accesstoken;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
