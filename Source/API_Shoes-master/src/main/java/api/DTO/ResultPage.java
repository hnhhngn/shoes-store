package api.DTO;

import java.util.ArrayList;
import java.util.List;

public class ResultPage {

    private int page;
    private int totalpage;
    private List<productsDTO> listResult = new ArrayList<>();


    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getTotalpage() {
        return totalpage;
    }

    public void setTotalpage(int totalpage) {
        this.totalpage = totalpage;
    }

    public List<productsDTO> getListResult() {
        return listResult;
    }

    public void setListResult(List<productsDTO> listResult) {
        this.listResult = listResult;
    }
}
