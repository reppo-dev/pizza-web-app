package controller

import (
	"backend/databases"
	"backend/models"
	"backend/utils"
	"context"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func GetAllAddress(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),5 * time.Second)
	defer cancel()

	var address []models.Address
	
	cookie := c.Cookies("jwt")

	id , err := utils.ParseJwt(cookie)

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	if err := databases.DB.WithContext(ctx).Where("user_id = ?",id).Find(&address).Error;err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found address"})
	}

	return c.JSON(address)
}

func GetAddress(c *fiber.Ctx) error {
	ctx,cancel:= context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	cookie := c.Cookies("jwt")

	userId , err := utils.ParseJwt(cookie)

	id , err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request id"})
	}

	var address models.Address

	if err := databases.DB.WithContext(ctx).Where("id = ? AND user_id = ?",id,userId).First(&address).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found address"})
	}

	return c.JSON(address)
}
