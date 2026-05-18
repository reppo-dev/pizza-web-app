package models

import "gorm.io/gorm"

type Categorys struct {
	gorm.Model
	Name string `json:"name"`
	Slug string `json:"slug"`
}

type CreateCategorys struct{
	Name string `json:"name"`
	Slug string `json:"slug"`
}