package models

import (
	"gorm.io/gorm"
)

type Cart struct {
	gorm.Model
	UserID uint 	   	 `json:"user_id" gorm:"uniqueIndex"`
	User   User        	 `json:"user"`
	Item   []CartItem	 `json:"items"`
}


type CartItem struct{
	gorm.Model
	CartID  uint   `json:"cart_id"`
	Cart    Cart   `json:"cart"`
	PizzaID uint   `json:"pizza_id"`
	Pizza Pizzas   `json:"pizza"`
	Quantity int   `json:"quantity" gorm:"default:1"`
	VariantName string `json:"variant_name"`
	Price float64  `json:"price"` 
}