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

	databases.DB.WithContext(ctx).Find(&variants)

	return c.JSON(variants)
}

func GetVariants(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()
	
	id,_:= strconv.Atoi(c.Params("id"))

	var variant models.Variants

	databases.DB.WithContext(ctx).First(&variant,id)

	return c.JSON(variant)
}

func CreateVariants(c *fiber.Ctx) error {
	var data models.CreateVariants

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()
	c.BodyParser(&data)

	variants := models.Variants{
		Type: data.Type,
		PizzaId: data.PizzaId,
		Price: data.Price,
	}

	databases.DB.WithContext(ctx).Create(&variants)

	return c.JSON(variants)
}

func UpdateVariants(c *fiber.Ctx) error {
	var data models.CreateVariants

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	id , _ := strconv.Atoi(c.Params("id"))

	var variants models.Variants

	databases.DB.WithContext(ctx).First(&variants,id)

	variants.Type = data.Type
	variants.Price = data.Price
	variants.PizzaId = data.PizzaId

	databases.DB.WithContext(ctx).Save(&variants)

	return c.JSON(variants)
}

func DeleteVariants(c *fiber.Ctx) error {
	id , _ := strconv.Atoi(c.Params("id"))

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	var variants models.Variants

	databases.DB.WithContext(ctx).Delete(&variants,id)

	return c.JSON(fiber.Map{
		"message":"delelet success",
	})
}