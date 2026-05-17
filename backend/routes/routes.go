package routes

import (
	"backend/controller"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	app.Post("/register",controller.RegisterUser)
	app.Post("/logout",controller.Logout)
	app.Post("/login",controller.Login)

	app.Get("/getuser",controller.GetUser)

	app.Get("/allpizza",controller.AllPizza)
	app.Post("/createpizza",controller.CreatePizza)
	app.Put("/updatepizza",controller.UpdatePizza)
	app.Delete("/deletepizza",controller.DeletePizza)
}
