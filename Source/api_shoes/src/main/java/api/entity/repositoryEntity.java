package api.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "repository")
public class repositoryEntity {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id")
    private typeEntity type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productdetailid")
    private productdetailEntity productdetail;

    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private Date datecreated;

    @NotNull
    @Min(1)
    private  int quantity;

    @NotNull
    private  float price;

    private String createdBy;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public typeEntity getType() {
        return type;
    }

    public void setType(typeEntity type) {
        this.type = type;
    }

    public Date getDatecreated() {
        return datecreated;
    }

    public void setDatecreated(Date datecreated) {
        this.datecreated = datecreated;
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

    public productdetailEntity getProductdetail() {
        return productdetail;
    }

    public void setProductdetail(productdetailEntity productdetail) {
        this.productdetail = productdetail;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
