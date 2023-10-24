package api.entity;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

import javax.persistence.*;

@Entity
@Table(name="image")
public class imageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @URL
    @NotBlank
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="productid")
    private productsEntity productsEntity;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public api.entity.productsEntity getProductsEntity() {
        return productsEntity;
    }

    public void setProductsEntity(api.entity.productsEntity productsEntity) {
        this.productsEntity = productsEntity;
    }
}
