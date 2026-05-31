package controller

import (
	"backend/databases"
	"backend/models"
	"context"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AllPizza(c *fiber.Ctx) error {

	var pizza []models.Pizzas

	
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	if err := databases.DB.WithContext(ctx).Preload("Variants").Find(&pizza).Error ; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to get pizza",
		})
	}

	return c.JSON(pizza)
}

func GetPizza(c *fiber.Ctx) error {
	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()
	id,err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid pizza id",
		})
	}
	var pizza models.Pizzas

	if err := databases.DB.WithContext(ctx).First(&pizza,id).Error; err !=nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":"Pizza not found",
		})
	}

	return c.JSON(pizza)
}


func CreatePizza(c *fiber.Ctx) error {
	var data models.PizzasCreatore

	ctx ,cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	if err := c.BodyParser(&data);err !=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid request body",
		})
	}

   pizza := models.Pizzas{
        Name:        data.Name,
        Description: data.Description,
        Image:       data.Image,
        Status:      data.Status,
    }

	if err := databases.DB.WithContext(ctx).Create(&pizza).Error ; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to create pizza",
		})
	}

	    if len(data.CategoryID) > 0 {
        var cats []models.Categorys
        databases.DB.Find(&cats, data.CategoryID)
        databases.DB.Model(&pizza).Association("Categories").Append(cats)
    }


	return c.JSON(pizza)
}

func UpdatePizza(c *fiber.Ctx) error {
    id, err := strconv.Atoi(c.Params("id"))
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid pizza id",
        })
    }

    var data models.PizzasCreatore
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    if err := c.BodyParser(&data); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid request body",
        })
    }

    // پیتزا رو به همراه دسته‌بندی‌های فعلی لود کن
    var pizza models.Pizzas
    if err := databases.DB.WithContext(ctx).
        Preload("Categories").
        First(&pizza, id).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "error": "Pizza not found",
        })
    }

    // فیلدهای ساده رو آپدیت کن
    pizza.Name = data.Name
    pizza.Description = data.Description
    pizza.Image = data.Image
    pizza.Status = data.Status

    // جایگزینی کامل دسته‌بندی‌ها
    if len(data.CategoryID) > 0 {
        var newCats []models.Categorys
        databases.DB.Find(&newCats, data.CategoryID)
        // جایگزینی (قبلی‌ها حذف، جدیدها اضافه)
        databases.DB.Model(&pizza).Association("Categories").Replace(newCats)
    } else {
        // اگر هیچ دسته‌بندی انتخاب نشده، همه رو حذف کن
        databases.DB.Model(&pizza).Association("Categories").Clear()
    }

    // ذخیره کلی (اختیاری؛ چون Replace خودش تغییرات رو سیو می‌کنه)
    if err := databases.DB.WithContext(ctx).Save(&pizza).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to update pizza",
        })
    }

    // پاسخ نهایی با Preload
    databases.DB.Preload("Categories").First(&pizza, pizza.ID)
    return c.JSON(pizza)
}

func DeletePizza(c *fiber.Ctx) error {

	ctx , cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	id,err:= strconv.Atoi(c.Params("id"))
	if err !=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":"Invalid pizza id",
		})
	}

	var pizza models.Pizzas

	if err := databases.DB.WithContext(ctx).First(&pizza, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Pizza not found",
		})
	}

	if err := databases.DB.WithContext(ctx).Delete(&pizza).Error; err != nil{
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":"Failed to delete pizza",
		})
	}

	return c.JSON(fiber.Map{
		"message":"delete succes",
	})
}