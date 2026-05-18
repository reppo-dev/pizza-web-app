package models

import "gorm.io/gorm"

type Pizzas struct {
	gorm.Model
	Name string `json:"name"`
	Description string `json:"description"`
	Image string `json:"image"`
	Status string `json:"status"`
	Variants    []Variants `gorm:"foreignKey:PizzaId" json:"variants,omitempty"`
	CategoryID  uint `json:"category_id"`
	Category   Categorys  `gorm:"foreignKey:CategoryID;references:ID" json:"category,omitempty"`
}

type PizzasCreatore struct {
	Name string `json:"name"`
	Description string `json:"description"`
	Image string `json:"image"`
	Status string `json:"status"`
	CategoryID  uint `json:"category_id"`
}