package routes

import "gorm.io/gorm"

type Variants struct {
    gorm.Model
    Type    string  `json:"type"`
    Price   float32 `json:"price"`
    PizzaId uint    `json:"pizza_id"`
    Pizza   Pizzas  `gorm:"foreignKey:PizzaId;references:ID" json:"pizza"`
}