import axios from "axios"

export default {
	checkAuth: function(){
		return fetch("/api/user/auth", {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
	},
	handleLogin: function(userData){
		return fetch("/auth/signin", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(userData),
        credentials: 'include',
        mode: 'cors'
      });
	},
	handleSignup: function(userData){
		return fetch("/auth/signup", {
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(userData),
      credentials: 'include',
      mode: 'cors'
    });
	},
	handlelogout: function(){
		return fetch("/auth/logout", {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
    }, 
    getNews: function(source) {
        console.log(source)
       return axios.get(`/api/news/${source}`)
    }
}
