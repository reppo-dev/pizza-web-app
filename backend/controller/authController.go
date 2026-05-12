package controller

import (
	"backend/databases"
	"backend/models"
	"backend/utils"
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

	 var user models.User

	 hashPassword , err := bcrypt.GenerateFromPassword([]byte(userRegister.Password),14)
	 if err != nil {
		return c.Status(500).JSON(fiber.Map{"error":"Failed to hash password"})
	 }

	 user.Email = userRegister.Email
	 user.Name = userRegister.Name
	 user.Password = string(hashPassword)
	
	databases.DB.WithContext(ctx).Create(&user)

	token,err := utils.GenerateJwt(user.ID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error":"server cant generate your jwt token"})
	}

	cookie := fiber.Cookie{
		Name: "jwt",//or any name example blablabla or ant ....
		Value: token,
		Expires: time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	 return c.JSON(fiber.Map{
		"message":"success",
	 })
}

func Login(c *fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	var user models.
}


func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name: "jwt",
		Value: "",
		Expires: time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message":"logout success",
	})
}