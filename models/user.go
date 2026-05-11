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
