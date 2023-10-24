package api.entity;

import javax.persistence.*;

@Entity
@Table(name="wishlist")
public class wishlistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="productid")
    private productsEntity products;

    @ManyToOne
    @JoinColumn(name ="customer_id")
    private customersEntity customers;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public productsEntity getProducts() {
        return products;
    }

    public void setProducts(productsEntity products) {
        this.products = products;
    }

    public customersEntity getCustomers() {
        return customers;
    }

    public void setCustomers(customersEntity customers) {
        this.customers = customers;
    }
}
