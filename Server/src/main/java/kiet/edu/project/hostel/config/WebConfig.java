package kiet.edu.project.hostel.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Adjust this to match your API paths
                .allowedOrigins("http://localhost:5173")  // Allow your React app's origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow the necessary HTTP methods
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
