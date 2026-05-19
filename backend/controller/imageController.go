package controller

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)


func Upload(c *fiber.Ctx) error {
    form, err := c.MultipartForm()
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid form data",
        })
    }

    files := form.File["image"]
    if len(files) == 0 {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "No image file provided",
        })
    }

    var uploadedURLs []string

    for _, file := range files {
        filename := fmt.Sprintf("%d-%s", time.Now().UnixNano(), file.Filename)
        savePath := fmt.Sprintf("./uploads/%s", filename)

        if err := c.SaveFile(file, savePath); err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "error": "Failed to save file",
            })
        }

        url := fmt.Sprintf("http://localhost:3000/uploads/%s", filename)
        uploadedURLs = append(uploadedURLs, url)
    }

    return c.JSON(fiber.Map{
        "success": true,
        "urls":   uploadedURLs,
    })
}