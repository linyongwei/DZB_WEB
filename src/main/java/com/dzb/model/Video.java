package VideoManagement;

import java.util.Date;
import java.util.List;

public class Video {
    //视频ID
    private int videoID;
    //视频名称
    private String videoName;
    //视频作者
    private String studentName;
    //视频上传日期
    private Date dateOfUpload;

    private List<Video> videoList;

    private String webPath;

    public Video(int videoID, String videoName, String studentName, Date date, String webPath){

    }

    public int getVideoID(){
        return videoID;
    }

    public void setVideoID(Integer videoID) {
        this.videoID = videoID;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String title) {
        this.videoName = title;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String author) {
        this.studentName = author;
    }

    public Date getDateOfUpload() {
        return dateOfUpload;
    }

    public void setDateOfUpload(Date dateOfUpload) {
        this.dateOfUpload = dateOfUpload;
    }

}
