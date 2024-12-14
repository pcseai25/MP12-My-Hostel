package kiet.edu.project.hostel.repositories;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import kiet.edu.project.hostel.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId>{
    
    Optional<User> findByEmail(String email);
    void deleteByEmail(String email);
}
