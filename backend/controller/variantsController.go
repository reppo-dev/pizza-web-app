package controller

import (
	"backend/databases"
	"backend/models"
	"context"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AllVariants(c *fiber.Ctx) error {
	var variants []models.Variants
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	if err := databases.DB.WithContext(ctx).Find(&variants).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to get variants",
		})
	}

	return c.JSON(variants)
}

func GetVariants(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	id,err:= strconv.Atoi(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid variant id",
		})
	}

	var variant models.Variants

	if err := databases.DB.WithContext(ctx).First(&variant,id).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":"variant not found",
		})
	}

	return c.JSON(variant)
}

func CreateVariants(c *fiber.Ctx) error {
	var data models.CreateVariants

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	if err := c.BodyParser(&data);err != nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid request body",
		})
	}

	variants := models.Variants{
		Type: data.Type,
		PizzaId: data.PizzaId,
		Price: data.Price,
	}

	if err := databases.DB.WithContext(ctx).Create(&variants).Error;err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to create variant",
		})
	}

	return c.JSON(variants)
}

func UpdateVariants(c *fiber.Ctx) error {
	var data models.CreateVariants

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	id ,err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid variant id",
		})
	}

	var variants models.Variants

	if err := databases.DB.WithContext(ctx).First(&variants,id).Error ; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":"varient not found",
		})
	}

	variants.Type = data.Type
	variants.Price = data.Price
	variants.PizzaId = data.PizzaId

	if err := databases.DB.WithContext(ctx).Save(&variants).Error; err !=nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to update varient",
		})
	}

	return c.JSON(variants)
}

func DeleteVariants(c *fiber.Ctx) error {
	id , err := strconv.Atoi(c.Params("id"))

	if err !=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid varient id",
		})
	}

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	var variants models.Variants
	if err := databases.DB.WithContext(ctx).First(&variants,id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":"Filed to found varient",
		})
	}

	 if err := databases.DB.WithContext(ctx).Delete(&variants).Error; err !=nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to delete variant",
		})
	 }

	return c.JSON(fiber.Map{
		"message":"delelet success",
	})
}