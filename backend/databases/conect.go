package databases

import (
	"backend/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Conect() {

	dns :="host=localhost user=postgres password=13802002 dbname=pizza port=5432 sslmode=disable"

	db,err := gorm.Open(postgres.Open(dns),&gorm.Config{})
	if err != nil {
		panic("we can't connect db")
	}

	DB =db
	db.AutoMigrate(&models.User{},&models.Role{},&models.Permission{},&models.Pizzas{},&models.Variants{})
}