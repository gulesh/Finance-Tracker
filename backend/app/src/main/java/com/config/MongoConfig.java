package com.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration{

    
    @Override
    public MongoClient mongoClient()
    {
        return MongoClients.create("mongodb://127.0.0.1:27017");
    }

    @Override
    protected String getDatabaseName()
    {
        return "financeAppDB";
    }

    @Override
    public boolean autoIndexCreation()
    {
        return true;
    }

    @Bean 
    MongoTemplate mongoTemplate()
    {
        return new MongoTemplate(mongoClient(), getDatabaseName());
    }
    
}
