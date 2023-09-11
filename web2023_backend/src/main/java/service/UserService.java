package service;

import model.Gender;
import model.User;
import model.UserRole;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class UserService {



    public static List<User> readUsersFromCSV(String csvFilePath) throws IOException {
        List<User> users = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(csvFilePath))) {
            String line;

            while ((line = reader.readLine()) != null) {

                String[] data = line.split(",");

                int id = Integer.parseInt(data[0]);

                User user = new User(
                        id,
                        data[1],           // username
                        data[2],           // password
                        data[3],           // email
                        data[4],           // firstName
                        data[5],           // lastName
                        LocalDate.parse(data[6]), // dateOfBirth (parsed from String to LocalDate)
                        Gender.valueOf(data[7]),  // gender (parsed from String to Gender enum)
                        UserRole.valueOf(data[8]), // role (parsed from String to UserRole enum)
                        data[9],           // profilePicturePath
                        // Arrays.asList(data[9].split(",")),    // posts (parsed to a List<String>)
                        // Arrays.asList(data[10].split(",")),   // imagePaths (parsed to a List<String>)
                        // Arrays.asList(data[11].split(",")),   // friendRequests (parsed to a List<String>)
                        //Arrays.asList(data[12].split(",")),   // friends (parsed to a List<String>)
                        Boolean.parseBoolean(data[10])        // isPrivate (parsed from String to boolean)
                );
                users.add(user);
            }
        }

        return users;
    }


    public static User getUserByIdFromCSV(int userId) throws IOException {

        String csvFilePath = "C:\\Users\\Nikola\\Documents\\GitHub\\Web2023\\Web2023_backend\\src\\main\\java\\data\\users.csv";
        try (BufferedReader reader = new BufferedReader(new FileReader(csvFilePath))) {
            String line;

            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");

                int idFromCSV = Integer.parseInt(data[0]);

                if (idFromCSV == userId) {

                    return new User(
                            userId,
                            data[1],           // username
                            data[2],           // password
                            data[3],           // email
                            data[4],           // firstName
                            data[5],           // lastName
                            LocalDate.parse(data[6]), // dateOfBirth
                            Gender.valueOf(data[7]),  // gender
                            UserRole.valueOf(data[8]), // role
                            data[9],           // profilePicturePath
                            Boolean.parseBoolean(data[10]) // isPrivate
                    );
                }
            }
        }


        return null;
    }


}