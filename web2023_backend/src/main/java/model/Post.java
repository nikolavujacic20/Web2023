package model;

import java.util.ArrayList;
import java.util.List;

public class Post {
    private int postId;
    private String imagePath;
    private String text;
    private List<Comment> comments = new ArrayList<>();

    public Post() {
    }

    public Post(int postId, String imagePath, String text, List<Comment> comments) {
        this.postId = postId;
        this.imagePath = imagePath;
        this.text = text;
        this.comments = comments;
    }





    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}