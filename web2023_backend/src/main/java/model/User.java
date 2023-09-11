package model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class User {


    public User(int id, String username, String password, String email, String firstName, String lastName, LocalDate dateOfBirth, Gender gender, UserRole role, String profilePicturePath, boolean isPrivate) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.role = role;
        this.profilePicturePath = profilePicturePath;
        this.isPrivate = isPrivate;
    }

    private int id;
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private UserRole role;
    private String profilePicturePath;
    private List<Post> posts = new ArrayList<>();
    private List<String> imagePaths = new ArrayList<>();
    private List<FriendRequest> friendRequests = new ArrayList<>();
    private List<User> friends = new ArrayList<>();
    private boolean isPrivate;

    public User() {
    }

    public User(String username, String password, String email, String firstName, String lastName, LocalDate dateOfBirth, Gender gender, UserRole role, String profilePicturePath, List<Post> posts, List<String> imagePaths, List<FriendRequest> friendRequests, List<User> friends, boolean isPrivate) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.role = role;
        this.profilePicturePath = profilePicturePath;
        this.posts = posts;
        this.imagePaths = imagePaths;
        this.friendRequests = friendRequests;
        this.friends = friends;
        this.isPrivate = isPrivate;
    }

    public User(String username, String password, String email, String firstName, String lastName, LocalDate dateOfBirth, Gender gender, UserRole role, String profilePicturePath, boolean isPrivate) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.role = role;
        this.profilePicturePath = profilePicturePath;
        this.isPrivate = isPrivate;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getProfilePicturePath() {
        return profilePicturePath;
    }

    public void setProfilePicturePath(String profilePicturePath) {
        this.profilePicturePath = profilePicturePath;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<String> getImagePaths() {
        return imagePaths;
    }

    public void setImagePaths(List<String> imagePaths) {
        this.imagePaths = imagePaths;
    }

    public List<FriendRequest> getFriendRequests() {
        return friendRequests;
    }

    public void setFriendRequests(List<FriendRequest> friendRequests) {
        this.friendRequests = friendRequests;
    }

    public List<User> getFriends() {
        return friends;
    }

    public void setFriends(List<User> friends) {
        this.friends = friends;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }
}