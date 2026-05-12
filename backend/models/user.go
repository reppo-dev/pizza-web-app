package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
    Name     string `json:"name" gorm:"not null"`
    Email    string `json:"email" gorm:"uniqueIndex;not null"`
    Password string `json:"-" gorm:"not null"`
	RoleID          uint    	`json:"role_id" gorm:"default:1"`
    Role            Role    	`json:"role" gorm:"foreignKey:RoleId"`
}

type RegisterUser struct {
    Name     		string `json:"name"`
    Email    		string `json:"email"`
    Password 		string `json:"-" gorm:"not null"`
	RoleID          uint    	`json:"role_id"`
}

type LoginUser struct {
    Email    		string `json:"email"`
    Password 		string `json:"-" gorm:"not null"`
}
