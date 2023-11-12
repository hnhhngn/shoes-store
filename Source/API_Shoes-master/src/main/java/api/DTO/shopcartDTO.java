package api.DTO;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class shopcartDTO {

    private long id;

    private long customersid;

    @NotNull
    private productdetailDTO productdetail;

    @NotNull
    @Min(1)
    private int quantity;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getCustomersid() {
        return customersid;
    }

    public void setCustomersid(long customersid) {
        this.customersid = customersid;
    }

    public productdetailDTO getProductdetail() {
        return productdetail;
    }

    public void setProductdetail(productdetailDTO productdetail) {
        this.productdetail = productdetail;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
