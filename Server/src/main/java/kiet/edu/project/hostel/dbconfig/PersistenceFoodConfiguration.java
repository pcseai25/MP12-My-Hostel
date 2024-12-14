package kiet.edu.project.hostel.dbconfig;


import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class PersistenceFoodConfiguration extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.product.uri}")
    private String mongoUri;

    @Value("${spring.data.mongodb.product.database}")
    private String mongoDbName;

    @Override
    protected String getDatabaseName() {
        return mongoDbName;  // The name of the MongoDB database
    }
    
    @Bean(name = "foodMongoClient")
    public MongoClient foodMongoClient() {
        return MongoClients.create(mongoUri);
    }
    
    @Bean
    public MongoTemplate foodMongoTemplate(@Qualifier("foodMongoClient") MongoClient mongoClient) {
        return new MongoTemplate(mongoClient(),getDatabaseName());
    }
}

