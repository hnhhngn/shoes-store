package api.entity;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;

@Entity
@Table(name ="customers")
public class customersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Size(min = 2,max = 50)
    private String firstname;

    @Size(min = 2,max = 50)
    private String lastname;

    @Size(min = 3,max = 200)
    private String address;

    @Size(min = 9,max = 10)
    private String phone;

    private String avatar;

    @OneToOne
    @JoinColumn(name ="users_id")
    private usersEntity usersEntitys;

    @OneToMany(mappedBy = "customersEntity")
    private Collection<ordersEntity> ordersEntities;

    @OneToMany(mappedBy = "customers")
    private Collection<wishlistEntity> wishlistEntities;

    @OneToMany(mappedBy = "customers")
    private Collection<shopcartEntity> customersproducts;


    public customersEntity(){}

    public customersEntity(String firstname, String lastname, String address, String phone, String avatar , usersEntity usersEntitys) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.phone = phone;
        this.avatar = avatar;
        this.usersEntitys = usersEntitys;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public usersEntity getUsersEntitys() {
        return usersEntitys;
    }

    public void setUsersEntitys(usersEntity usersEntitys) {
        this.usersEntitys = usersEntitys;
    }


}
