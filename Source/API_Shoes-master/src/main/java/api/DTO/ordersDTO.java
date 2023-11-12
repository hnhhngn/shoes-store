package api.DTO;

import api.entity.*;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public class ordersDTO {

    private String id;

    @NotNull
    private float total;

    @NotBlank
    private String status;

    @NotBlank
    private String address;

    @NotBlank
    private String phone;

    @Email
    private String email;

    private String fullname;

    private String createdBy;

    private Date createdDate;

    private String modifiedBy;

    private Date modifiedDate;

    private  paymentEntity paymentEntity;

    private List<orderdetailDTO> listOrderdetail;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public api.entity.paymentEntity getPaymentEntity() {
        return paymentEntity;
    }

    public void setPaymentEntity(api.entity.paymentEntity paymentEntity) {
        this.paymentEntity = paymentEntity;
    }

    public List<orderdetailDTO> getListOrderdetail() {
        return listOrderdetail;
    }

    public void setListOrderdetail(List<orderdetailDTO> listOrderdetail) {
        this.listOrderdetail = listOrderdetail;
    }
}
