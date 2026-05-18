package controller

import (
	"backend/databases"
	"backend/models"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AllCategorys(c *fiber.Ctx) error {
	var category models.Categorys
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	if err := databases.DB.WithContext(ctx).Find(&category).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to get category",
		})
	}

	return c.JSON(category)
}