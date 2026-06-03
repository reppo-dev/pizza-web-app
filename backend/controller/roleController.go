package controller

import (
	"backend/databases"
	"backend/models"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AllRoles(c *fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5 * time.Second)
	defer cancel()

	var role []models.Role

	if err:= databases.DB.WithContext(ctx).Find(&role).Error; err !=nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found roles"})
	}


	return c.JSON(role)
}