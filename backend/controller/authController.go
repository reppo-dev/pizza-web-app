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

func GetUser(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	cookie := c.Cookies("jwt")

	if cookie == ""{
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"unauthenticated"})
	}

	id , err := utils.ParseJwt(cookie)
	if err != nil{
		 return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "message": "invalid or expired token",
        })
	}

	var user models.User

	result := databases.DB.WithContext(ctx).Preload("Role").First(&user,id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"user not found"})
	}

	return c.JSON(user)
	
}

func UpdateUser(c *fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),5 * time.Second)
	defer cancel()

	var data models.InfoUser

	cookie := c.Cookies("jwt")

	id,err := utils.ParseJwt(cookie)

	if err!=nil {
		return  c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error":"Invalid or expire token"})
	}

	var user models.User

	if err := c.BodyParser(&data); err != nil{
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error":"Invalid request body"})
	}

	if err := databases.DB.WithContext(ctx).First(&user,id).Error; err != nil{
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"Failed found user"})
	}

	user.Email = data.Email
	user.Image = data.Image
	user.Name = data.Name
	user.RoleID = data.RoleID

	if err := databases.DB.WithContext(ctx).Save(&user).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"Failed update user"})
	}

	return c.JSON(fiber.Map{"message":"Success update user"})
}

func Login(c *fiber.Ctx) error {
	ctx,cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	var data models.LoginUser

	if err :=c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{"error":"Invalid request"})
	}

	var user models.User

	databases.DB.WithContext(ctx).Where("email = ?",data.Email).Find(&user)

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password),[]byte(data.Password)); err != nil{
		return c.Status(404).JSON(fiber.Map{"error":"incorect password"})
	}

	token , err := utils.GenerateJwt(user.ID)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	cookie := fiber.Cookie{
		Name: "jwt",
		Value: token,
		Expires: time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message":"login success",
	})
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