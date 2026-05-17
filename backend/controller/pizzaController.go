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
	return c.JSON(pizza)
}

func UpdatePizza(c *fiber.Ctx) error {

	id , _ := strconv.Atoi(c.Params("id"))
	var data models.PizzasCreatore

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()
	c.BodyParser(&data)

	var pizza models.Pizzas

	
	databases.DB.WithContext(ctx).First(&pizza,id)

    pizza.Name = data.Name
    pizza.Description = data.Description
    pizza.Image = data.Image
    pizza.Status = data.Status

	databases.DB.WithContext(ctx).Save(&pizza)



	return c.JSON(pizza)
}

func DeletePizza(c *fiber.Ctx) error {

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	id,_:= strconv.Atoi(c.Params("id"))

	var pizza models.Pizzas

	databases.DB.WithContext(ctx).Delete(&pizza,id)

	return c.JSON(fiber.Map{
		"message":"delete succes",
	})
}