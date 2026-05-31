package controller

import (
	"backend/databases"
	"backend/models"
	"context"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AllCategorys(c *fiber.Ctx) error {
	var category []models.Categorys
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	if err := databases.DB.WithContext(ctx).Find(&category).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to get category",
		})
	}

	return c.JSON(category)
}

func GetCategory(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),10*time.Second)
	defer cancel()


	id,err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid category id",
		})
	}

	var category models.Categorys


	if err := databases.DB.WithContext(ctx).First(&category,id).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":"Filed to found category",
		})
	}

	return c.JSON(category)
}

func CreateCategory(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	var data models.CreateCategorys

	if err := c.BodyParser(&data) ; err != nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid request body",
		})
	}
	
	category := models.Categorys{
		Name: data.Name,
		Slug: data.Slug,
	}

	if err := databases.DB.WithContext(ctx).Create(&category).Error;err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Filed to create category",
		})
	}

	return c.JSON(category)
}

func UpdateCategory(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),10*time.Second)
	defer cancel()

	id,err := strconv.Atoi(c.Params("id"))
	if err !=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid category id",
		})
	}

	var data models.CreateCategorys

	if err := c.BodyParser(&data); err != nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid request body",
		})
	}

	var category models.Categorys

	if err := databases.DB.WithContext(ctx).First(&category,id).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":"Filed to found category",
		})
	}

	category.Name = data.Name
	category.Slug = data.Slug

	if err := databases.DB.WithContext(ctx).Save(&category).Error; err!=nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Filed update category",
		})
	}

	return c.JSON(category)
}

func DeleteCartgory(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),10*time.Second)
	defer cancel()
	id , err := strconv.Atoi(c.Params("id"))
	if err !=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid caregory id",
		})
	}

	var category models.Categorys
	
	if err := databases.DB.WithContext(ctx).First(&category,id).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":"Filed found category",
		})
	}

	if err := databases.DB.WithContext(ctx).Delete(&category).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Filed delete category",
		})
	}


	return c.JSON(category)
}