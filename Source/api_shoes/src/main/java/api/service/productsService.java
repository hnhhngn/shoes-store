package api.service;

import api.DTO.ResultPage;
import api.DTO.imageDTO;
import api.DTO.productdetailDTO;
import api.DTO.productsDTO;
import api.entity.*;
import api.exception.IdNotFoundException;
import api.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Component
public class productsService {
    @Autowired
    productsRepository productsRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    categoryService categoryService;

    @Autowired
    categoryRepository categoryRepository;

    @Autowired
    discountRepository discountRepository;

    @Autowired
    productdetailRepository productdetailRepository;

    @Autowired
    imageRepository imageRepository;

    @Autowired
    discountService discountService;

    @Autowired
    usersRepository usersRepository;

    @Autowired
    customersRepository customersRepository;


    public productsDTO saveproducts(productsDTO productDTO,String username){
        if(!categoryService.checkid(productDTO.getCategoryid())){
            throw new IdNotFoundException("could not find category "+productDTO.getCategoryid());
        }

        productsEntity productsEntitys = productsRepository.findById(productDTO.getId());
        if(productsEntitys == null){
            productsEntitys = modelMapper.map(productDTO,productsEntity.class);
            productsEntitys.setCreateddate(new Date());
            productsEntitys.setCreatedby(username);
        }else {
            productDTO.setColor(productDTO.getColor());
            productsEntitys.setPrice(productDTO.getPrice());
            productsEntitys.setModifiedby(productDTO.getModifiedby());
            productsEntitys.setModifieddate(productDTO.getModifieddate());
            productsEntitys.setDeadline(productDTO.getDeadline());
            productsEntitys.setDescription(productDTO.getDescription());
            productsEntitys.setDiscountEntitys(discountService.getDiscount(productDTO.getDiscount()));
            productsEntitys.setDeadline(productDTO.getDeadline());
            productsEntitys.setName(productDTO.getName());
            productsEntitys.setColor(productDTO.getColor());
            productsEntitys.setModifieddate(new Date());
            productsEntitys.setModifiedby(username);
            if(productsEntity.Status.ACTIVE.toString().equals(productDTO.getStatus())){
                productsEntitys.setStatus(productsEntity.Status.ACTIVE);
            }else{
                productsEntitys.setStatus(productsEntity.Status.INACTIVE);
            }
            productsEntitys.setUnitype(productDTO.getUnitype());
            productsEntitys.setRating(productDTO.getRating());
        }
        final productsEntity finalproduct = productsEntitys;
        //image
        List<imageEntity> imageEntityList = productDTO.getListimage().stream().map(
                imageDTO -> {
                    imageEntity image = modelMapper.map(imageDTO,imageEntity.class);
                    image.setProductsEntity(finalproduct);
                    return image;
                }
        ).collect(Collectors.toList());
        // discount
         discountEntity discount = discountRepository.findById(productDTO.getDiscount());
        if(discount != null){
            productsEntitys.setDiscountEntitys(discount);
        }
        //category
        categoryEntity  category = categoryService.findOnecategory(productDTO.getCategoryid());
        productsEntitys.setCategory(category);
        productsEntitys.setImageEntities(imageEntityList);

        List<productdetailEntity> productdetail = productDTO.getListsize().stream().map(
                productdetalDTO -> {
                    productdetailEntity productdetailEntity = modelMapper.map(productdetalDTO, api.entity.productdetailEntity.class);
                    productdetailEntity.setProductsEntity(finalproduct);
                    return productdetailEntity;
                }
        ).collect(Collectors.toList());

        productsEntitys.setProductdetailEntities(productdetail);
        //create product
        productsRepository.save(productsEntitys);
        productsDTO pro = parseProductDTO(productsEntitys);
        return  pro;
    }


    public productsDTO getproduct(long id){
        productsDTO productDTO = null;
        productsEntity productsEntity = productsRepository.findById(id);
        if(productsEntity == null){
            return  productDTO;
        }
        productDTO = parseProductDTO(productsEntity);
        return productDTO;
    }


    public List<productsDTO> parseList(List<productsEntity> list){
        List<productsDTO> listDTO = list.stream().map(
                productsEntity -> {
                    productsDTO productDTO = parseProductDTO(productsEntity);
                    return productDTO;
                }

        ).collect(Collectors.toList());
        return listDTO;
    }


    public productsDTO parseProductDTO(productsEntity productsEntity){
        productsDTO productDTO = modelMapper.map(productsEntity,productsDTO.class);
        List<productdetailDTO> listproductdetail = productdetailRepository.findByProductid(productDTO.getId()).stream().map(
                productdetailEntity -> {
                    productdetailDTO productdetail = modelMapper.map(productdetailEntity,productdetailDTO.class);
                    productdetail.setProductid(productdetailEntity.getProductsEntity().getId());
                    return  productdetail;
                }
        ).collect(Collectors.toList());
        List<imageDTO> listimage = imageRepository.findByProductid(productDTO.getId()).stream().map(
                imageEntity -> {
                    imageDTO imageDTO = modelMapper.map(imageEntity, api.DTO.imageDTO.class);
                    imageDTO.setProductid(imageEntity.getProductsEntity().getId());
                    return  imageDTO;
                }
        ).collect(Collectors.toList());
        if(productsEntity.getDiscountEntitys() != null){
            productDTO.setDiscount(productsEntity.getDiscountEntitys().getId());
        }
        productDTO.setCategoryid(productsEntity.getCategory().getId());
        productDTO.setCategoryname(productsEntity.getCategory().getName());
        productDTO.setListimage(listimage);
        productDTO.setListsize(listproductdetail);
        return productDTO;
    }

    public  boolean isNumeric(String str) {
        return str.matches("-?\\d+(\\.\\d+)?");  //match a number with optional '-' and decimal.
    }

    public ResultPage productPagination(int page, int size, String typeSort, Long categoryId,
                                        String orderBy, String statusPro,Optional<String> title){
        ResultPage resultPage = new ResultPage();
        Pageable pageable  ;
        Page<productsEntity> Result ;

        // check role
        productsEntity.Status status =  productsEntity.Status.ACTIVE;
        if(statusPro.equals("INACTIVE")){
          status =  productsEntity.Status.INACTIVE;
        }

        if(categoryId != null){ // category product
            Sort sort;
            if(orderBy.toUpperCase().equals("DESC")){
                sort  = new Sort(Sort.Direction.DESC, typeSort);
            }else{
                sort = new Sort(Sort.Direction.ASC, typeSort);
            }
            pageable = new PageRequest(page - 1,size,sort);
            if(title.isPresent()){
                long id;
                if(isNumeric(title.get())){
                   id = Long.valueOf(title.get());
                    Result = productsRepository.findByStatusAndCategory_idAndId(status,
                            categoryId,id,pageable);
                }else{
                    Result = productsRepository.findByStatusAndCategory_idAndNameContaining(status,
                            categoryId,title.get(),pageable);
                }
            }else{
                Result = productsRepository.findByStatusAndCategory_id(status,categoryId,pageable);
            }
        }else{ // all product
            Sort sort;
            if(orderBy.toUpperCase().equals("DESC")){
                sort  = new Sort(Sort.Direction.DESC, typeSort);
            }else{
                sort = new Sort(Sort.Direction.ASC, typeSort);
            }
            pageable = new PageRequest(page - 1,size,sort);
            if(title.isPresent()){
                long id;
                if(isNumeric(title.get())){
                    id = Long.valueOf(title.get());
                    Result = productsRepository.findByStatusAndId(status,id,pageable);

                }else{
                    Result = productsRepository.findByStatusAndNameContaining(status, title.get(),pageable);
                }
            }else{
                Result = productsRepository.findByStatus(status,pageable);
            }
        }

        resultPage.setPage(Result.getNumber()  + 1 );
        resultPage.setListResult(parseList(Result.getContent()));
        resultPage.setTotalpage(Result.getTotalPages());
        return resultPage;
    }


    public  List<productsDTO> getProductSale(int size){
        List<productsDTO> list = new ArrayList<>();
        Sort sort  = new Sort(Sort.Direction.DESC,"createddate");
        Pageable pageable = new PageRequest(0,size,sort);
        List<discountEntity> listDiscount = discountRepository.findAll();
        if(listDiscount.size() == 0){
            return list;
        }
        Collections.reverse(listDiscount);
        productsEntity.Status status =  productsEntity.Status.ACTIVE;
        for (discountEntity discount : listDiscount ) {
            if(discount.getDeadline().compareTo(new Date()) > 0){
                List<productsDTO> listtemp = parseList(productsRepository.findByStatusAndDiscountEntitys(status,discount,pageable).getContent());
                for(productsDTO proDTO : listtemp){
                    list.add(proDTO);
                    if(list.size() == size) return list;
                }
            }
        }
        return  list;
    }

    public List<productsDTO> getProductMaybe(Long categoryId ,int limit){
          productsEntity.Status status =  productsEntity.Status.ACTIVE;
          List<productsEntity> listRes =  productsRepository.findByStatusAndCategory_id(status,categoryId);
          List<productsEntity> listRandom = new ArrayList<>();
          Random rand = new Random();

          if(limit > listRes.size()){
              return parseList(listRes);
          }

          int[] check = new int[limit];
          int i = 0;
          int temp;
          while(true){
              int randomIndex = rand.nextInt(listRes.size());
              temp = 0;
              for (int j : check){
                  if(j == randomIndex){
                      temp = 1;
                  }
              }
              if(temp == 0){
                  check[i] = randomIndex;
                  listRandom.add(listRes.get(randomIndex));
                  i++;
                  if(listRandom.size() == limit) return parseList(listRandom);
              }
          }
    }
}
