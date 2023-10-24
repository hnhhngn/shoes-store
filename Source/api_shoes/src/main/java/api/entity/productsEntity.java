package api.entity;

import org.hibernate.validator.constraints.NotBlank;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "products")
public class productsEntity {
    public enum Status {
        INACTIVE,ACTIVE;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String color;

    @NotBlank
    @Size(min = 5,max =100)
    private String name;

    @NotBlank
    @Size(min = 5,max =500)
    private String description;

    @NotNull
    private float price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="discount_id")
    private discountEntity discountEntitys;

    private int rating;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    private Date deadline;

    private String unitype;

    @NotBlank
    private String createdby;

    private Date createddate;

    private String modifiedby;

    private Date modifieddate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="category_id")
    private categoryEntity category;

    @OneToMany(mappedBy = "products",fetch = FetchType.LAZY)
    private Collection<wishlistEntity> wishlistEntities ;

    @OneToMany(mappedBy = "productsEntity",cascade = CascadeType.ALL)
    private List<imageEntity> imageEntities = new ArrayList<>();

    @OneToMany(mappedBy = "productsEntity",cascade = CascadeType.ALL)
    private List<productdetailEntity> productdetailEntities = new ArrayList<>();;



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public discountEntity getDiscountEntitys() {
        return discountEntitys;
    }

    public void setDiscountEntitys(discountEntity discountEntitys) {
        this.discountEntitys = discountEntitys;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getUnitype() {
        return unitype;
    }

    public void setUnitype(String unitype) {
        this.unitype = unitype;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public Date getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Date createddate) {
        this.createddate = createddate;
    }

    public String getModifiedby() {
        return modifiedby;
    }

    public void setModifiedby(String modifiedby) {
        this.modifiedby = modifiedby;
    }

    public Date getModifieddate() {
        return modifieddate;
    }

    public void setModifieddate(Date modifieddate) {
        this.modifieddate = modifieddate;
    }

    public List<imageEntity> getImageEntities() {
        return imageEntities;
    }

    public void setImageEntities(List<imageEntity> imageEntities) {
        this.imageEntities = imageEntities;
    }

    public List<productdetailEntity> getProductdetailEntities() {
        return productdetailEntities;
    }

    public void setProductdetailEntities(List<productdetailEntity> productdetailEntities) {
        this.productdetailEntities = productdetailEntities;
    }

    public categoryEntity getCategory() {
        return category;
    }

    public void setCategory(categoryEntity category) {
        this.category = category;
    }
}
