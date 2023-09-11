package service;

import model.*;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class PostService {




    public static List<Post> readPostsFromCSV() throws IOException {

        String csvFilePath = "C:\\Users\\Nikola\\Documents\\GitHub\\Web2023\\Web2023_backend\\src\\main\\java\\data\\posts.csv";
        List<Post> posts = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(csvFilePath))) {
            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                String[] data = line.split(",");

                int id = Integer.parseInt(data[0]);
                List<Comment> comments = CommentService.readCommentsFromCSV(id);
                Post post = new Post(
                        id,
                        data[1],           // imagePath
                        data[2],
                        comments//textPost


                );
                System.out.println(post.getText());
                posts.add(post);
            }
        }

        return posts;
    }

}
