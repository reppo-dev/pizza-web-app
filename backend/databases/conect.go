package databases

import (
	"backend/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Conect() {

	// for example ⭣⭣⭣
	dns := "host=localhost user=postgres password=******** dbname=shoppy port=5432 sslmode=disable"
	// dns := "host=your_host user=your_databace password=your_password_databace dbname=name_db port=port_database sslmode=disable"

	db,err := gorm.Open(postgres.Open(dns),&gorm.Config{})
	if err != nil {
		panic("we can't connect db")
	}

	DB =db
	db.AutoMigrate(&models.User{},&models.Role{},&models.Permission{},&models.Pizzas{},&models.Variants{},&models.CartItem{},&models.Cart{},&models.Address{})
}
