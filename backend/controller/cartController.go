package controller

import (
	"backend/databases"
	"backend/models"
	"backend/utils"
	"strconv"

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

	 result := databases.DB.Where("user_id = ?",userId).Preload("Item.Pizza").First(&cart)

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

func AddToCart(c *fiber.Ctx) error {
	
	cookie := c.Cookies("jwt")

	if cookie == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Missin authentication token"})
	}

	userId,err := utils.ParseJwt(cookie)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expired token"})
	}

	 var req struct {
		VariantID uint `json:"variant_id"`
        PizzaID uint   `json:"pizza_id"`
        Quantity  int  `json:"quantity"`
    }

	if req.Quantity <= 0 {
		req.Quantity = 1
	}

	if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
    }

	var cart models.Cart

	result := databases.DB.Where("user_id = ?" ,userId).First(&cart)

	if result.Error == gorm.ErrRecordNotFound {
		cart = models.Cart{UserID: userId}
		if err := databases.DB.Create(&cart).Error;err != nil{
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed create cart"})
		}

	} else if result.Error != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Pizza not found"})
	}

	var variant models.Variants

	if err := databases.DB.First(&variant,req.VariantID).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"failed found variant"})
	}

	var pizza models.Pizzas

	if err := databases.DB.First(&pizza,req.PizzaID).Error;err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Pizza not found"})
	}

	var cartitem models.CartItem

	err = databases.DB.Where(
    "cart_id = ? AND pizza_id = ? AND variant_name = ?",cart.ID,pizza.ID,variant.Type,).First(&cartitem).Error

	if err == nil{
    cartitem.Quantity += req.Quantity

    if err := databases.DB.Save(&cartitem).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).
            JSON(fiber.Map{"error":"Failed to update"})
    }
		
	} else if err == gorm.ErrRecordNotFound {
		newItem := models.CartItem{
			CartID: cart.ID,
			PizzaID: pizza.ID,
			Quantity: req.Quantity,
			VariantName: variant.Type,
			Price: float64(variant.Price),
		}

		if err := databases.DB.Save(&newItem).Error; err != nil{
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed save new item"})
		}
	}


	return c.JSON(fiber.Map{"message":"Pizza added to cart successfully"})
}

func UpdateCartItem(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request id"})
	}

	var req struct{
		Quantity  int `json:"quantity"`
	}

	var cartitem models.CartItem

	if err := databases.DB.First(&cartitem,id).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found cart item"})
	}

	cartitem.Quantity = req.Quantity
	if cartitem.Quantity <= 0 {
		cartitem.Quantity = 1
	}

	if err := databases.DB.Save(&cartitem).Error;err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed update cart item"})
	}

	return c.JSON(fiber.Map{"message":"success update cart item"})
}

func DeleteCartItem(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	
	userId,err := utils.ParseJwt(cookie)

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or epired token"})
	}

	var cart models.Cart

	if err := databases.DB.Where("user_id = ?",userId).First(&cart).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed found cart"})
	}

	itemId,err := strconv.Atoi(c.Params("id"))
	if err != nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request id"})
	}

	if err := databases.DB.Where("id = ? AND cart_id = ?",itemId,cart.ID).Delete(&models.CartItem{}).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed delete cart item"})
	}

	return c.JSON(fiber.Map{"message":"success delete cart item"})

}