package controller

import (
	"backend/databases"
	"backend/models"
	"context"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AllUsers(c *fiber.Ctx) error {
	ctx , candel := context.WithTimeout(context.Background(),5 * time.Second)
	defer candel()

	var users []models.User

	if err := databases.DB.WithContext(ctx).Find(&users).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found users"})
	}

	return c.JSON(users)
}

func User(c *fiber.Ctx) error {
	ctx , candel := context.WithTimeout(context.Background(),5 * time.Second)
	defer candel()

	id,err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	var user models.User
	
	if err := databases.DB.WithContext(ctx).First(&user,id).Error;err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found user"})
	}

	return c.JSON(user)
}
