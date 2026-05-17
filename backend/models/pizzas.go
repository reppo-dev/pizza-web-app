package models

import "gorm.io/gorm"

type Pizzas struct {
	gorm.Model
	Name string `json:"name"`
	Description string `json:"description"`
	Image string `json:"image"`
	Status string `json:"status"`
	Variants    []Variants `gorm:"foreignKey:PizzaId" json:"variants,omitempty"`
}

type PizzasCreatore struct {
	Name string `json:"name"`
	Description string `json:"description"`
	Image string `json:"image"`
	Status string `json:"status"`
}