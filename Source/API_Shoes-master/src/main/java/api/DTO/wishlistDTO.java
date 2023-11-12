package api.DTO;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

public class wishlistDTO {

    private long id;

    @NotNull
    private long productid;

    @NotNull
    private long customerid;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getProductid() {
        return productid;
    }

    public void setProductid(long productid) {
        this.productid = productid;
    }

    public long getCustomerid() {
        return customerid;
    }

    public void setCustomerid(long customerid) {
        this.customerid = customerid;
    }
}
