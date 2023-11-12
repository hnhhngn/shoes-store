package api.service;

import api.DTO.ResultPageOrder;
import api.DTO.ResultPageRepository;
import api.DTO.productdetailDTO;
import api.DTO.repositoryDTO;
import api.entity.*;
import api.repository.productdetailRepository;
import api.repository.productsRepository;
import api.repository.repositoryRepository;
import api.repository.typeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Component
public class repositoryService {
    @Autowired
    repositoryRepository repositoryRepository;

    @Autowired
    productsRepository productsRepository;

    @Autowired
    productdetailRepository productdetailRepository;

    @Autowired
    typeRepository typeRepository;

    @Autowired
    ModelMapper modelMapper;



    public List getListRepository(){
        List<repositoryEntity> list = repositoryRepository.findAll();
        return list;
    }


    public ResultPageRepository getListRepositoryPageAdmin(int page, int size, Optional<String> title,
                                                      String typeSort, String orderBy, Optional<String> type ){
        ResultPageRepository resultPage = new ResultPageRepository();
        Pageable pageable  ;
        Page<repositoryEntity> Result ;

        if(title.isPresent()){ //
            Sort sort;
            if(orderBy.toUpperCase().equals("DESC")){
                sort  = new Sort(Sort.Direction.DESC, typeSort);
            }else{
                sort = new Sort(Sort.Direction.ASC, typeSort);
            }

            pageable = new PageRequest(page - 1,size,sort);
            Result = repositoryRepository.findByType_idAndIdContaining(type.get(),title.get(),pageable);
        }else{ // all
            Sort sort;
            if(orderBy.toUpperCase().equals("DESC")){
                sort  = new Sort(Sort.Direction.DESC, typeSort);
            }else{
                sort = new Sort(Sort.Direction.ASC, typeSort);
            }

            pageable = new PageRequest(page - 1,size,sort);
            Result = repositoryRepository.findByType_id(type.get(),pageable);
        }

        resultPage.setPage(Result.getNumber()  + 1 );
        resultPage.setListResult( parseListRepo(Result.getContent()));
        resultPage.setTotalpage(Result.getTotalPages());
        return resultPage;
    }




    // tạo phiếu nhập (PN)
    public repositoryDTO createRepository(repositoryDTO repository,String username){
        repositoryEntity repositoryEntity = null;
        repositoryDTO repositoryDTOs = null;
        productdetailEntity productdetail =  productdetailRepository.findById(repository.getProductdetail().getId());
        typeEntity type = typeRepository.findById(repository.getTypeid());
        if(productdetail == null || type == null){
            return  repositoryDTOs;
        }
        String id = "PN"+ repository.getDatecreated().getTime();
        repositoryEntity = modelMapper.map(repository, api.entity.repositoryEntity.class);
        repositoryEntity.setId(id);
        repositoryEntity.setProductdetail(productdetail);
        repositoryEntity.setType(type);
        repositoryEntity.setDatecreated(repository.getDatecreated());
        repositoryEntity.setPrice(repository.getPrice());
        repositoryEntity.setQuantity(repository.getQuantity());
        repositoryEntity.setCreatedBy(username);
        repositoryRepository.save(repositoryEntity);

        // product detail
        long valueNew = productdetail.getInventory()+repository.getQuantity();
        productdetail.setInventory(valueNew);
        productdetailRepository.save(productdetail);

        // convert DTO
        repositoryDTOs = modelMapper.map(repositoryEntity,repositoryDTO.class);
        repositoryDTOs.setTypeid(repositoryEntity.getType().getId());
        //product detail dto
        productdetailDTO productdetailDTO = modelMapper.map(repositoryEntity.getProductdetail(),productdetailDTO.class);
        productdetailDTO.setProductid(repositoryEntity.getProductdetail().getProductsEntity().getId());
        repositoryDTOs.setProductdetail(productdetailDTO);

        return repositoryDTOs;

    }


    public repositoryDTO updateRepository(repositoryDTO repositorydto){
        repositoryDTO res = null;
        repositoryEntity repository = repositoryRepository.findById(repositorydto.getId());
        if(repository == null){
            return res;
        }
        productdetailEntity  productdetailEntitys = productdetailRepository.findById(repositorydto.getProductdetail().getId());
        if(productdetailEntitys == null){
            return  res;
        }
        repository.setProductdetail(productdetailEntitys);
        repository.setPrice(repositorydto.getPrice());
        repository.setQuantity(repositorydto.getQuantity());
        repositoryRepository.save(repository);

        // product detail
        long valueNew = productdetailEntitys.getInventory() - repository.getQuantity();
        valueNew += repositorydto.getQuantity();
        productdetailEntitys.setInventory(valueNew);
        productdetailRepository.save(productdetailEntitys);
        return  repositorydto;
    }


    public List<repositoryDTO> parseListRepo(List<repositoryEntity> listRep){
        List<repositoryDTO> list = listRep.stream().map(
                repositoryEntity -> {
                    repositoryDTO repositoryDTOs = modelMapper.map(repositoryEntity,repositoryDTO.class);
                    repositoryDTOs.setTypeid(repositoryEntity.getType().getId());
                    //product detail dto
                    productdetailDTO productdetailDTO = modelMapper.map(repositoryEntity.getProductdetail(),productdetailDTO.class);
                    productdetailDTO.setProductid(repositoryEntity.getProductdetail().getProductsEntity().getId());
                    repositoryDTOs.setProductdetail(productdetailDTO);
                    return  repositoryDTOs;
                }
        ).collect(Collectors.toList());

        return list;
    }


    public Object slNhapHang(String mode,long idpro,String strDateFrom,String strDateTo) throws ParseException {
        Float[] strfloat = new Float[2];
        Date datefrom = new SimpleDateFormat("dd/MM/yyyy").parse( strDateFrom );
        Date dateto = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse(strDateTo +" 23:59:59");
        float totalnhaphang = 0;
        float totalprice = 0;
        if(mode.equals("DETAIL")){
            //get repository
            List<repositoryEntity> listrepo = repositoryRepository.findByDatecreatedBetween(datefrom,dateto);
            for(repositoryEntity repo : listrepo){
                if(repo.getProductdetail().getId() == idpro){
                    totalnhaphang+=repo.getQuantity();
                    totalprice+=(repo.getPrice()*repo.getQuantity());
                }
            }
            strfloat[0] = totalnhaphang;
            strfloat[1] = totalprice;
        }else if(mode.equals("PRODUCT")){
            //get repository
            List<repositoryEntity> listrepo = repositoryRepository.findByDatecreatedBetween(datefrom,dateto);
            for(repositoryEntity repo : listrepo){
                if(repo.getProductdetail().getProductsEntity().getId() == idpro){
                    totalnhaphang+=repo.getQuantity();
                    totalprice+=(repo.getPrice()*repo.getQuantity());
                }
            }
            strfloat[0] = totalnhaphang;
            strfloat[1] = totalprice;
        }else{
            //get repository
            List<repositoryEntity> listrepo = repositoryRepository.findByDatecreatedBetween(datefrom,dateto);
            for(repositoryEntity repo : listrepo){
                    totalnhaphang+=repo.getQuantity();
                totalprice+=(repo.getPrice()*repo.getQuantity());
            }
            strfloat[0] = totalnhaphang;
            strfloat[1] = totalprice;
        }
        return  strfloat;
    }

}
