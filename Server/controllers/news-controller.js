const db = require("../models");
const axios = require("axios")
const keys = require("../config/keys")


module.exports = {

  getStories: (req, res) => {
    axios.get(`https://newsapi.org/v2/top-headlines?sources=bleacher-report&apiKey=${keys.news.apiKey}`).then(news => {
      res.json(news.data.articles)
    })

  }

}