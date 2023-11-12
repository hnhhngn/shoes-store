package api.DTO;

public class FileResponse {

    String linkfile;

    public FileResponse(String linkfile) {
        this.linkfile = linkfile;
    }

    public String getLinkfile() {
        return linkfile;
    }

    public void setLinkfile(String linkfile) {
        this.linkfile = linkfile;
    }
}
