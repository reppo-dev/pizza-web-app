package controller

import (
	"backend/databases"
	"backend/models"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AllPizza(c *fiber.Ctx) error {

	var pizza models.Pizzas

	
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	databases.DB.WithContext(ctx).Preload("Variants").Find(&pizza)

	return c.JSON(pizza)
}


func CreatePizza(c *fiber.Ctx) error {
	var data models.PizzasCreatore

	ctx ,cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	c.BodyParser(&data)

	pizza := models.Pizzas{
		Name: data.Name,
		Description: data.Description,
		Image: data.Image,
		Status: data.Status,
	}

	databases.DB.WithContext(ctx).Create(&pizza)
}