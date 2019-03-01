package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/kataras/golog"
)

type Article struct {
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}

type Articles []Article

func homePage(w http.ResponseWriter, r *http.Request) {
	host, err := os.Hostname()
	check(err)
	fmt.Fprintf(w, "Welcome to the HomePage! \n\nHostname is %s", host)

	golog.Info("Endpoint Hit: homePage")
}

func allArticles(w http.ResponseWriter, r *http.Request) {
	articles := Articles{
		Article{Title: "Hello", Desc: "Article Description", Content: "Article Content"},
		Article{Title: "Hello 2", Desc: "Article Description", Content: "Article Content"},
	}
	golog.Info("Endpoint Hit: All Articles Endpoint")

	json.NewEncoder(w).Encode(articles)
}

func check(err error) {
	if err != nil {
		golog.Info(err)
		os.Exit(1)
	}
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/articles", allArticles)
	golog.Fatal(http.ListenAndServe(":3000", nil))
}

func main() {
    golog.SetLevel("debug")

	golog.Infof("service listening on %s", "3000")
	handleRequests()
}

