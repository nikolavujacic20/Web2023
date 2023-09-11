package main;
import controller.PostController;
import controller.UserController;
import spark.Spark;

import java.io.IOException;

import static spark.Spark.*;

public class Main {




    public static void main(String[] args) throws IOException {

        port(8081);


        UserController.setupRoutes();
        PostController.setupRoutes();



    }
}