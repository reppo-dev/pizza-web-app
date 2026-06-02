package models

import "gorm.io/gorm"

type Address struct {
	gorm.Model
	UserID 	      uint   `json:"user_id"`
	FullName      string `json:"full_name"`
	Phone         string `json:"phone"`
	Province      string `json:"province"`
	City          string `json:"city"`
	Street        string `json:"street"`
	Apartment 	  string `json:"apartment"`
	PostalCode    string `json:"postal_code"`
	Notes         string `json:"delivery_notes"`
}

type InfoAddress struct{
	UserID 	      uint   `json:"user_id"`
	FullName      string `json:"full_name"`
	Phone         string `json:"phone"`
	Province      string `json:"province"`
	City          string `json:"city"`
	Street        string `json:"street"`
	Apartment 	  string `json:"apartment"`
	PostalCode    string `json:"postal_code"`
	Notes         string `json:"delivery_notes"`
}