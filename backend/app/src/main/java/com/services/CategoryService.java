package com.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
// import org.springframework.data.mongodb.core.FindAndModifyOptions;
// import org.springframework.data.mongodb.core.query.Criteria;
// import org.springframework.data.mongodb.core.query.Query;
// import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.repositories.CategoryRepository;
import com.entities.Category;
import com.exceptionhandler.CategoryNotFound;
import com.exceptionhandler.DuplicateCategory;

@Service
public class CategoryService {
    //inject CategoryRepo here
    private final CategoryRepository categoryRepo;
    //private final MongoTemplate mongoTemplate;

    @Autowired
    public CategoryService(CategoryRepository categoryrepo, MongoTemplate mongotemplate)
    {
        this.categoryRepo = categoryrepo;
        // this.mongoTemplate = mongotemplate;
    }

    //return all the categories
    public List<Category> getAllCategories()
    {
        return this.categoryRepo.findAll();
    }

    //find category by name
    public Category getCategoryByName(String name)
    {
        return this.categoryRepo.findByName(name);
    }

    public Category getCategoryById(String id) throws Exception
    {
        Optional<Category> optionalCategory = this.categoryRepo.findById(id);
        if(optionalCategory.isPresent())
        {
            return optionalCategory.get();
        } 
        else
        {
            return null; //later check this null
        }
    }

    //add new category
    public Category addNewCategory(Category category) throws DuplicateCategory
    {
        try
        {
            return this.categoryRepo.save(category);
        }
        catch(DataIntegrityViolationException e)
        {
            throw new DuplicateCategory(category.getName());
        }
    }

    //modify existing category
    public Category editCategory(String id, Map<String, Object> attributes) throws Exception
    {
        Optional<Category> optionalExistingCategory = this.categoryRepo.findById(id);
        if(!optionalExistingCategory.isPresent())
        {
            throw new CategoryNotFound("Id: " + id);
        }
        else 
        {
            Category existingCategory = optionalExistingCategory.get();
            String newName = (String) attributes.get("name");
            if(newName != null && !newName.equals(existingCategory.getName()))
            {
                Category categoryWithNewName = this.categoryRepo.findByName(newName);
                if(categoryWithNewName != null)
                {
                    throw new DuplicateCategory(newName);
                }
            }
            attributes.forEach((key, value) ->
            {  
                switch (key) {
                    case "name": 
                        if (value instanceof String) {
                            existingCategory.setName((String) value);
                        }
                        break;
                    case "amountAllocated":
                        if (value instanceof Number) {
                            existingCategory.setAmountAllocated(((Number) value).doubleValue());
                        }
                        break;
                    case "amountSpent":
                        if (value instanceof Number) {
                            existingCategory.setAmountSpent(((Number) value).doubleValue());
                        }
                        break;
                    case "recurring":
                        if(value instanceof Boolean )
                        {
                            existingCategory.setRecurring((boolean) value);
                        }
                        break;
                    default:
                        break;
                }
            });
            this.categoryRepo.save(existingCategory);
            return existingCategory;
        }

        /* 
        Query query = new Query(Criteria.where("name").is(name)); //creating a query
        Update update = new Update();

        attributes.forEach((key, value) ->
        {  
            switch (key) {
                case "name": 
                    existingCategory.setName((String) value);
                    break;
                case "amountAllocated": 
                    update.set("amountAllocated", (Integer) value);
                    break;
                case "amountSpent": 
                    update.set("amountSpent", (Integer) value);
                    break;
                case "recurring": 
                    update.set("recurring", (boolean) value);
                    break;
                default:
                    break;
            }
        });

        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true);
        return mongoTemplate.findAndModify(query, update, options, Category.class);
        */

    }

    //delete a category
    public boolean deleteCategory(String name)
    {
        Category category = this.categoryRepo.findByName(name);
        if( category == null)
        {
            throw new CategoryNotFound(name);
        }
        this.categoryRepo.deleteByName(name);
        return true; //category successfully deleted 
    }
}
