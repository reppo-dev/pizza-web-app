package controller

import (
	"backend/databases"
	"backend/models"
	"context"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AllPizza(c *fiber.Ctx) error {

	var pizza []models.Pizzas

	
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	if err := databases.DB.WithContext(ctx).Preload("Variants").Find(&pizza).Error ; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to get pizza",
		})
	}

	return c.JSON(pizza)
}

func GetPizza(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()
	id,err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid pizza id",
		})
	}
	var pizza models.Pizzas

	if err := databases.DB.WithContext(ctx).First(&pizza,id).Error; err !=nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":"Pizza not found",
		})
	}

	return c.JSON(pizza)
}


func CreatePizza(c *fiber.Ctx) error {
	var data models.PizzasCreatore

	ctx ,cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	if err := c.BodyParser(&data);err !=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid request body",
		})
	}

	pizza := models.Pizzas{
		Name: data.Name,
		Description: data.Description,
		Image: data.Image,
		Status: data.Status,
	}

	if err := databases.DB.WithContext(ctx).Create(&pizza).Error ; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to create pizza",
		})
	}
	return c.JSON(pizza)
}

func UpdatePizza(c *fiber.Ctx) error {

	id , err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid pizza id",
		})
	}
	var data models.PizzasCreatore

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()
	if err := c.BodyParser(&data);err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid request body",
		})
	}

	var pizza models.Pizzas

	
	if err := databases.DB.WithContext(ctx).First(&pizza,id).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":"pizza not found",
		})
	}

    pizza.Name = data.Name
    pizza.Description = data.Description
    pizza.Image = data.Image
    pizza.Status = data.Status

	if err :=databases.DB.WithContext(ctx).Save(&pizza).Error; err!=nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to update pizza",
		})
	}



	return c.JSON(pizza)
}

func DeletePizza(c *fiber.Ctx) error {

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	id,err:= strconv.Atoi(c.Params("id"))
	if err !=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid pizza id",
		})
	}

	var pizza models.Pizzas

	if err := databases.DB.WithContext(ctx).First(&pizza, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Pizza not found",
		})
	}

	if err := databases.DB.WithContext(ctx).Delete(&pizza,id).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to delete pizza",
		})
	}

	return c.JSON(fiber.Map{
		"message":"delete succes",
	})
}