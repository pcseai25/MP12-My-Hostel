package kiet.edu.project.hostel.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import kiet.edu.project.hostel.models.FoodData;

@Repository
public interface FoodRepository extends MongoRepository<FoodData,String> {
    List<FoodData> findByFood(String food);

}
