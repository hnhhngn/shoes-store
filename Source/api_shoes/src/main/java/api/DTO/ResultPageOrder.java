package api.DTO;

import java.util.ArrayList;
import java.util.List;

public class ResultPageOrder {
    private int page;
    private int totalpage;
    private List<ordersDTO> listResult = new ArrayList<>();


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

    public List<ordersDTO> getListResult() {
        return listResult;
    }

    public void setListResult(List<ordersDTO> listResult) {
        this.listResult = listResult;
    }
}
