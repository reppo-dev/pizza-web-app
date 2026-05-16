package routes

import "gorm.io/gorm"

type Pizzas struct {
	gorm.Model
	Name string `json:"name"`
	Description string `json:"description"`
	Image string `json:"image"`
	Status string `json:"status"`
}