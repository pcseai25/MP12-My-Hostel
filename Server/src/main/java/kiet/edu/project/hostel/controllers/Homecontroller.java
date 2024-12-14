package kiet.edu.project.hostel.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/users/")
public class Homecontroller {
    
    @GetMapping("/home")
    public String home(){
        return "hi";
    }
}
