const db = require("../models");
const axios = require("axios")
const keys = require("../config/keys")


module.exports = {

  getStories: (req, res) => {
    // axios.get(`https://newsapi.org/v2/top-headlines?sources=bleacher-report&apiKey=${keys.news.apiKey}`).then(news => {
    //   res.json(news.data.articles)
    // })
    axios.get(`https://newsapi.org/v2/sources?apiKey=${keys.news.apiKey}`).then(news => {
      console.log(news.data)
      
    const arr = []
      for (let i = 70 ; i < news.data.sources.length ; i++ ) {
        arr.push(news.data.sources[i].id)
      }
      console.log(arr)
      res.json(news.data)
    })
  }

}