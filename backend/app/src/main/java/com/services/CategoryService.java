package com.services;

import java.util.List;
import java.util.Map;

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
    public Category editCategory(String name, Map<String, Object> attributes)
    {
        Category existingCategory = this.categoryRepo.findByName(name);
        if(existingCategory == null)
        {
            throw new CategoryNotFound(name);
        }
        else 
        {
            String newName = (String) attributes.get("name");
            if(newName != null && !newName.equals(name))
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
                        existingCategory.setName((String) value);
                        break;
                    case "amountAllocated":
                        existingCategory.setAmountAllocated((Integer) value);
                        break;
                    case "amountSpent":
                        existingCategory.setAmountSpent((Integer) value);
                        break;
                    case "recurring":
                        existingCategory.setRecurring((boolean) value);
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
