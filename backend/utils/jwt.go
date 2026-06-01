package utils

import (
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
)

const SekretKey = "secret"

func GenerateJwt(userId uint) (string, error) {
	claims := jwt.StandardClaims{
		Issuer: strconv.Itoa(int(userId)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(SekretKey))
}

func ParseJwt(cookie string) (uint,error) {
	token,err := jwt.ParseWithClaims(cookie,&jwt.StandardClaims{},func(t *jwt.Token) (interface{}, error) {
		return []byte(SekretKey),nil
	})
	if err != nil || !token.Valid {
		return 0,err
	}

	claims := token.Claims.(*jwt.StandardClaims)

	id , err := strconv.ParseUint(claims.Issuer,10,32)

	if err != nil {
		return 0,err
	}

	return uint(id) , err
}
