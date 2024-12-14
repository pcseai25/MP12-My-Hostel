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
public class PersistenceUserConfiguration extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Value("${spring.data.mongodb.database}")
    private String mongoDbName;

    @Override
    protected String getDatabaseName() {
        return mongoDbName;  // The name of the MongoDB database
    }

    @Bean(name = "userMongoClient")
    public MongoClient userMongoClient() {
        return MongoClients.create(mongoUri);
    }
    
    @Bean
    public MongoTemplate userMongoTemplate(@Qualifier("userMongoClient") MongoClient mongoClient) {
        return new MongoTemplate(mongoClient(),getDatabaseName());
    }
}
