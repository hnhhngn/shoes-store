package api.entity;


import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="shopcart")
public class shopcartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
//    @MapsId("customersid")
    @JoinColumn(name="customersid")
    private customersEntity customers;

    @ManyToOne
    @JoinColumn(name="productdetailid")
    private productdetailEntity productdetail;

    @NotNull
    @Min(1)
    private int quantity;


    public customersEntity getCustomers() {
        return customers;
    }

    public void setCustomers(customersEntity customers) {
        this.customers = customers;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public productdetailEntity getProductdetail() {
        return productdetail;
    }

    public void setProductdetail(productdetailEntity productdetail) {
        this.productdetail = productdetail;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
