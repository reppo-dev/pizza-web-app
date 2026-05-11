package main

import (
	"backend/databases"
	"backend/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	databases.Conect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000/",
		AllowCredentials: true,
	}))

	routes.Setup(app)

	app.Listen(":8000")
}