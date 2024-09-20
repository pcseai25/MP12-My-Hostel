package kiet.edu.project.hostel.services;

import kiet.edu.project.hostel.models.Role;
import kiet.edu.project.hostel.models.User;
import kiet.edu.project.hostel.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User findConsumerByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createConsumer(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User createVendor(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.VENDOR);
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        User savedUser = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        savedUser.setUsername(user.getUsername());
        savedUser.setPhone(user.getPhone());
        savedUser.setAddress(user.getAddress());
        savedUser.setImage(user.getImage());
        savedUser.setEmail(user.getEmail());
        savedUser.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(savedUser);
    }

    public void deleteByUserName(String name) {
        userRepository.deleteByEmail(name);
    }
}
