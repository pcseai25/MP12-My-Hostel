package kiet.edu.project.canteen_connect.repositories;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import kiet.edu.project.hostel.Hostel;
import kiet.edu.project.hostel.models.FoodData;
import kiet.edu.project.hostel.models.User;
import kiet.edu.project.hostel.repositories.FoodRepository;
import kiet.edu.project.hostel.repositories.UserRepository;

@SpringBootTest(classes=Hostel.class)
public class UserRepositoryTest {

    @Autowired 
    UserRepository userRepository;

    @Autowired
    FoodRepository foodRepository;
    

    @Test
    public void testRepo(){
        Optional<User> user=userRepository.findByEmail("akshat@gmail.com");

        assertTrue(user.isPresent());
        
    }
    @Test
    public void testfood(){
        List<FoodData> foodData= foodRepository.findByFood("chane ki sabji");
        assertTrue(!foodData.isEmpty());
    }

}
