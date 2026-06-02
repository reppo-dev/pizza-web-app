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
	app.Delete("/deletevariant/:id",controller.DeleteVariants)

	app.Get("/allcategory",controller.AllCategorys)
	app.Get("/getcategory/:id",controller.GetCategory)
	app.Post("/createcategory",controller.CreateCategory)
	app.Put("/updatecategory/:id",controller.UpdateCategory)
	app.Delete("/deletecategory/:id",controller.DeleteCartgory)

	app.Post("/upload",controller.Upload)

	app.Get("/users",controller.AllUsers)
	app.Get("/user/:id",controller.User)

	app.Get("/cart",controller.Cart)
	app.Post("/addtocart",controller.AddToCart)
	app.Put("/updatecartitem/:id",controller.UpdateCartItem)
	app.Delete("/deletecartitem/:id",controller.DeleteCartItem)
}
