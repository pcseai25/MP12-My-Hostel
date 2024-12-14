package kiet.edu.project.hostel.services;

import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import kiet.edu.project.hostel.models.FoodData;
import kiet.edu.project.hostel.models.User;
import kiet.edu.project.hostel.repositories.FoodRepository;
import kiet.edu.project.hostel.repositories.UserRepository;
import kiet.edu.project.hostel.utils.JwtUtil;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserService {
    private final FoodRepository foodRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;
  

    public User findConsumerByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createConsumer(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public User getCurrentUser(String token) {
        String username = jwtUtil.extractUsername(token);
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    // public User createVendor(User user) {
    //     user.setPassword(passwordEncoder.encode(user.getPassword()));
    //     user.setRole(Role.VENDOR);
    //     return userRepository.save(user);
    // }

    public User updateUser(User user) {
        User savedUser = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        savedUser.setUsername(user.getUsername());
        savedUser.setPhone(user.getPhone());
        savedUser.setAddress(user.getAddress());
        savedUser.setImage(user.getImage());
        savedUser.setEmail(user.getEmail());
        savedUser.setPassword(passwordEncoder.encode(user.getPassword()));
        savedUser.setFood(user.getFood());
        savedUser.setComment(user.getComment());
        return userRepository.save(savedUser);
    }
    // public User updateUserfood(Food foodDto,String email) {
    //     User savedUser = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    //     savedUser.setFood(foodDto.getFood());
    //     savedUser.setComment(foodDto.getComment());
    //     return userRepository.save(savedUser);
    // }
     
    public void deleteByUserName(String name) {
        userRepository.deleteByEmail(name);
    }

    public FoodData saveFood(FoodData foodData){
        return foodRepository.save(foodData);
    }
    public List<FoodData> getFood(){
        return foodRepository.findAll();
    }
}
