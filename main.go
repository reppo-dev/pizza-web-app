package main

import (
	"backend/databases"

	"github.com/gofiber/fiber/v2"
)

func main() {
	databases.Conect()

	app := fiber.New()

	app.Listen(":8000")
}