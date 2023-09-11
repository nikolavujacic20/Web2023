package model;

import java.time.LocalDateTime;

public class Comment {

    private int postId;
    private int commentId;
    private User commentator;
    private String commentText;
    private LocalDateTime commentDate;
    private LocalDateTime lastEditDate;

    public Comment() {

    }

    public Comment(int commentId, User commentator, String commentText, LocalDateTime commentDate, LocalDateTime lastEditDate) {
        this.commentId = commentId;
        this.commentator = commentator;
        this.commentText = commentText;
        this.commentDate = commentDate;
        this.lastEditDate = lastEditDate;
    }

    public Comment(int commentId, User commentator,int postId,String commentText, LocalDateTime commentDate, LocalDateTime lastEditDate) {
        this.commentId = commentId;
        this.commentator = commentator;
        this.postId = postId;
        this.commentText = commentText;
        this.commentDate = commentDate;
        this.lastEditDate = lastEditDate;
    }

    public int getPostId() {
        return postId;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public User getCommentator() {
        return commentator;
    }

    public void setCommentator(User commentator) {
        this.commentator = commentator;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public LocalDateTime getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(LocalDateTime commentDate) {
        this.commentDate = commentDate;
    }

    public LocalDateTime getLastEditDate() {
        return lastEditDate;
    }

    public void setLastEditDate(LocalDateTime lastEditDate) {
        this.lastEditDate = lastEditDate;
    }
}