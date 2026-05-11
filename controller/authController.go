package controller

import (
	"backend/databases"
	"backend/models"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(c *fiber.Ctx) error {

	ctx , cancel := context.WithTimeout(context.Background(),10 *time.Second)
	defer cancel()
	var userRegister models.RegisterUser

	 if err := c.BodyParser(&userRegister);err != nil{
		return c.Status(400).JSON(fiber.Map{"error":"Invalid request"})
	 }

	 var exist models.User

	 err := databases.DB.WithContext(ctx).Where("email = ?",userRegister.Email).First(&exist).Error
	 if err == nil{
		return c.Status(409).JSON(fiber.Map{"error":"Email already exists"})
	 }


	 var user models.User

	 hashPassword , err := bcrypt.GenerateFromPassword([]byte(userRegister.Password),14)
	 if err != nil {
		return c.Status(500).JSON(fiber.Map{"error":"Failed to hash password"})
	 }

	 user.Email = userRegister.Email
	 user.Name = userRegister.Name
	 user.Password = string(hashPassword)
	
	result := databases.DB.WithContext(ctx).Create(&user)

	if result.Error != nil {
		return c.Status(500).JSON()
	}
	 return c.JSON(fiber.Map{
		"message":"success",
	 })
}