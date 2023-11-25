package com.app;

import org.springframework.core.env.Environment;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.IOException;
import java.util.Arrays;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;


@EnableScheduling
@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.repositories")
@ComponentScan(basePackages = {"com.controllers", "com.services", "com.entities", "com.config"})
public class Application {

    @Autowired
    private Environment environment;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        // ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
        // Application application = context.getBean(Application.class);
        //application.rn();
    }

    @Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {

			System.out.println("Let's inspect the beans provided by Spring Boot:");
			String[] beanNames = ctx.getBeanDefinitionNames();
			Arrays.sort(beanNames);
			for (String beanName : beanNames) {
				System.out.println(beanName);
			}
		};
	}

    public void rn()
    {
        System.out.println("app running !");

        System.out.println("Resource Paths:");
        try {
            Resource[] resources = new PathMatchingResourcePatternResolver().getResources("classpath*:application.properties");
            for (Resource resource : resources) {
                System.out.println(resource.getURI());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        Properties properties = System.getProperties();
        properties.forEach((key, value) -> System.out.println(key + ": " + value));

        System.out.println(environment.getProperty("test.property"));
    }
}
