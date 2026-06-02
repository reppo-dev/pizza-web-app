package models

import "gorm.io/gorm"

type Address struct {
	gorm.Model
	FullName   string `json:"full_name"`
	Province   string `json:"province"`
	City       string `json:"city"`
	Street     string `json:"street"`
	Apartment  string `json:"apartment"`
	PostalCode string `json:"postal_code"`
	DeliveryNotes string `json:"delivery_notes"`
}