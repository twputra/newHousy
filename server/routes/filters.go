package routes

import (
	"housy/handlers"
	"housy/pkg/mysql"
	"housy/repositories"

	// "housey/pkg/middleware"

	"github.com/gorilla/mux"
)

func FilterRoutes(r *mux.Router) {
	filterRepository := repositories.RepositoryFilter(mysql.DB)
	h := handlers.HandlerFilter(filterRepository)

	r.HandleFunc("/multifilter", h.MultiFilter).Methods("GET")

}
