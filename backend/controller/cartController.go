package controller

import (
	"backend/databases"
	"backend/models"
	"backend/utils"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Cart(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	if cookie == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Missin authentication token"})
	}

	userId , err := utils.ParseJwt(cookie)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	var cart models.Cart

	 result := databases.DB.Where("user_id = ?",userId).Preload("items.pizzas").First(&cart)

	 if result.Error == gorm.ErrRecordNotFound {
		cart = models.Cart{UserID: userId}

		if err := databases.DB.Create(&cart).Error;err!=nil{
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed create cart"})
		}

		return c.JSON(fiber.Map{"cart":cart})
	 }
	 
	 if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed to fetch cart"})
	 }

	 var total float64

	 for _, item := range cart.Item{
		total += item.Price * float64(item.Quantity)
	 }

	 return c.JSON(fiber.Map{"cart":cart,"items":cart.Item,"total":total,"count":  len(cart.Item),})
}

