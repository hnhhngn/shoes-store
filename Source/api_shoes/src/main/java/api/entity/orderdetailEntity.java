package api.entity;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="orderdetail")
public class orderdetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="productdetailid")
    private productdetailEntity productdetailEntity;

    @NotNull
    @Min(1)
    private int quantity;

    @NotNull
    private float price;

    @ManyToOne
    @JoinColumn(name="order_id")
    private ordersEntity orders;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public api.entity.productdetailEntity getProductdetailEntity() {
        return productdetailEntity;
    }

    public void setProductdetailEntity(api.entity.productdetailEntity productdetailEntity) {
        this.productdetailEntity = productdetailEntity;
    }

    public ordersEntity getOrders() {
        return orders;
    }

    public void setOrders(ordersEntity orders) {
        this.orders = orders;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
