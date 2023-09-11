package model;

import java.time.LocalDateTime;

public class FriendRequest {
    private User sender;
    private User recipient;
    private FriendRequestStatus status;
    private LocalDateTime requestDate;

    public FriendRequest() {
    }

    public FriendRequest(User sender, User recipient, FriendRequestStatus status, LocalDateTime requestDate) {
        this.sender = sender;
        this.recipient = recipient;
        this.status = status;
        this.requestDate = requestDate;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getRecipient() {
        return recipient;
    }

    public void setRecipient(User recipient) {
        this.recipient = recipient;
    }

    public FriendRequestStatus getStatus() {
        return status;
    }

    public void setStatus(FriendRequestStatus status) {
        this.status = status;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }
}