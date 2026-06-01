package controller

import (
	"backend/databases"
	"backend/models"
	"context"
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