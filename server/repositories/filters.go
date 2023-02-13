package repositories

import (
	"housy/models"
	"net/url"
	"strconv"

	"gorm.io/gorm"
)

type FilterRepository interface {
	MultiFilter(params url.Values) ([]models.House, error)
}

func RepositoryFilter(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) MultiFilter(params url.Values) ([]models.House, error) {
	var houses []models.House

	type_rent := params.Get("type_rent")
	// image := params.Get("image")
	// price, _ := strconv.ParseFloat(params.Get("price"), 64)
	bedroom, _ := strconv.Atoi(params.Get("bedroom"))
	bathroom, _ := strconv.Atoi(params.Get("bathroom"))
	// amenities := params.Get("amenities")

	err := r.db.Where("type_rent = ? AND bedroom = ? AND bathroom = ?", type_rent, bedroom, bathroom).Find(&houses).Error

	return houses, err

}
