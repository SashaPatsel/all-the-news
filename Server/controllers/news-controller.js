const db = require("../models");
const request = require("request")
const keys = require("../config/keys")


module.exports = {

  getStories: (req, res) => {
    request(`https://newsapi.org/v2/top-headlines?sources=bleacher-report&apiKey=${keys.news.apiKey}`)
  }

}