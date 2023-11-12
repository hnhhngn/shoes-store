package api.DTO;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class infoOrderDTO {

    @NotBlank
    private String fullname;

    @NotBlank
    private String address;

    @NotBlank
    private String email;

    @NotBlank
    @Size(max = 10,min = 9)
    private String phone;

    @NotNull
    private long paymentid;

    @NotNull
    private List<shopcartDTO> shopcart;


    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public long getPaymentid() {
        return paymentid;
    }

    public void setPaymentid(long paymentid) {
        this.paymentid = paymentid;
    }

    public List<shopcartDTO> getShopcart() {
        return shopcart;
    }

    public void setShopcart(List<shopcartDTO> shopcart) {
        this.shopcart = shopcart;
    }
}
