package kiet.edu.project.hostel.controllers;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import kiet.edu.project.hostel.dtos.UserDTO;
import kiet.edu.project.hostel.models.FoodData;
import kiet.edu.project.hostel.models.User;
import kiet.edu.project.hostel.services.UserDetailsServiceImpl;
import kiet.edu.project.hostel.services.UserService;
import kiet.edu.project.hostel.utils.JwtUtil;
import lombok.RequiredArgsConstructor;


@RequestMapping("/api/v1/users")
@RestController
@RequiredArgsConstructor
public class UserController {
   
    @Value("${security.jwt.secret-key}")
    private String secretKey;
   

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsServiceImpl;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping
    public ResponseEntity<?> registerUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findConsumerByEmail(authentication.getName());
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        User savedUser = userService.createConsumer(newUser);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{userEmail}")
                .buildAndExpand(savedUser.getEmail())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO user) {
        logger.info("before authentication");
       Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
       logger.info("Successfully autheticated");
      if (authentication.isAuthenticated()) {
            logger.info("Successfully autheticated");
            Map<String, String> authResponse = new HashMap<>();
            authResponse.put("token", jwtUtil.generateToken(userDetailsServiceImpl.loadUserByUsername(
                    user.getEmail())));
                    
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        }
        throw new UsernameNotFoundException("Invalid credentials");
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7); // Remove "Bearer " prefix
        User user = userService.getCurrentUser(token);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/itempro")
    public ResponseEntity<String> getitem(){
        return ResponseEntity.ok("new item");
    }


    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        User updatedUser = userService.updateUser(user);
        return ResponseEntity.ok().body(updatedUser);
    }
    // @PutMapping("/sentiments")
    // public ResponseEntity<?> updateUser(@RequestBody Food foodDto,@RequestHeader("Authorization") String token) {
    //     if (token.startsWith("Bearer ")) {
    //         token = token.substring(7);
    //     }

    //     String email = jwtUtil.extractUsername(token);
    //     User updatedUser = userService.updateUserfood(foodDto,email);
    //     return ResponseEntity.ok().body(updatedUser);
    // }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userService.deleteByUserName(authentication.getName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/item")
    public ResponseEntity<?> createfoodlist(@RequestBody FoodData foodData){
        // logger.info("before save food");
        userService.saveFood(foodData);
         return new ResponseEntity<>(HttpStatus.OK);
    }
   
    @GetMapping("/item")
    public List<FoodData> getFoodList(){
       return userService.getFood();
    }
}
