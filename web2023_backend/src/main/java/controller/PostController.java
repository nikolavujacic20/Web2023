package controller;

import com.google.gson.Gson;
import model.Post;
import model.User;
import service.PostService;
import service.UserService;

import java.util.List;

import static spark.Spark.get;

public class PostController {

    public static void setupRoutes() {


        get("/posts", (request, response) -> {

            List<Post> allPosts = PostService.readPostsFromCSV();

            Gson gson = new Gson();
            String jsonPosts = gson.toJson(allPosts);


            response.type("application/json");


            return jsonPosts;
        });
    }
}
