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
	app.Get("/getpizza/:id",controller.GetPizza)
	app.Post("/createpizza",controller.CreatePizza)
	app.Put("/updatepizza/:id",controller.UpdatePizza)
	app.Delete("/deletepizza/:id",controller.DeletePizza)

	app.Get("/allvariant",controller.AllVariants)
	app.Get("/getvariant/:id",controller.GetVariants)
	app.Post("/createvariant",controller.CreateVariants)
	app.Put("/updatevariant",controller.UpdateVariants)
	app.Delete("/deletevariant",controller.DeleteVariants)
}
