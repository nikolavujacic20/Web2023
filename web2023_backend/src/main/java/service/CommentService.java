package service;

import model.Comment;
import model.User;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

public class CommentService {

    public static String csvFilePath = "C:\\Users\\Nikola\\Documents\\GitHub\\Web2023\\Web2023_backend\\src\\main\\java\\data\\comments.csv";

    public static List<Comment> readCommentsFromCSV(int postId) throws IOException {
        List<Comment> comments = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(csvFilePath))) {
            String line;

            while ((line = reader.readLine()) != null) {

                String[] data = line.split(",");

                int commentId = Integer.parseInt(data[0]);

                User user = UserService.getUserByIdFromCSV(Integer.parseInt(data[1]));
                int postsId = Integer.parseInt(data[2]);

                String commentText = data[3];
                if (postsId == postId) {
                    try {
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
                        LocalDateTime commentDate = LocalDateTime.parse(data[4], formatter);
                        LocalDateTime lastEditDate = LocalDateTime.parse(data[5], formatter);

                        Comment comment = new Comment(
                                commentId,
                                user,
                                postId,
                                commentText,
                                commentDate,
                                lastEditDate
                        );
                        comments.add(comment);

                    } catch (DateTimeParseException e) {
                        System.err.println("Error: Unable to parse the string as a LocalDateTime.");
                    }

                }
            }
        }

        return comments;
    }

}