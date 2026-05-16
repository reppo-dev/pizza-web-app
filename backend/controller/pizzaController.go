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
