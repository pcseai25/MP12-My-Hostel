package kiet.edu.project.hostel.models;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection="food")
@Data
public class FoodData {
    
    @NotBlank(message="select food first")
    String food;
    
    @NotBlank(message="should be rank food")
    String comment;
}
