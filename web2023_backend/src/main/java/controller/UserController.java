package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import model.User;
import service.UserService;
import static spark.Spark.*;
import java.io.IOException;
import java.util.List;

public class UserController {

    public static void setupRoutes() {



        get("/users", (request, response) -> {

            List<User> allUsers = UserService.readUsersFromCSV("C:\\Users\\Nikola\\Documents\\GitHub\\Web2023\\Web2023_backend\\src\\main\\java\\data\\users.csv");

            Gson gson = new Gson();
            String jsonUsers = gson.toJson(allUsers);


            response.type("application/json");


            return jsonUsers;
        });




        post("/login", (request, response) -> {

            JsonObject json = new JsonParser().parse(request.body()).getAsJsonObject();


            String email = json.get("email").getAsString();
            String password = json.get("password").getAsString();


            String result = login(email, password);




            return result;
        });

        // Other routes for user-related actions
    }


    public static String login(String email, String password) throws IOException {

        List<User> users = UserService.readUsersFromCSV("C:\\Users\\Nikola\\Documents\\GitHub\\Web2023\\Web2023_backend\\src\\main\\java\\data\\users.csv");

        for (User user : users) {
            if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
                return "Login successful";
            }
        }
        return "Authentication failed jebote";
    }
}