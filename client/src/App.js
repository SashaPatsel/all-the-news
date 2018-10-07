import React, { Component } from 'react';

import logo from './beary2.png';

import Panel from './components/Panel'
import Input from './components/Input'
import Button from './components/Button'
import Story from './components/Story'

import sources from "./data/sources"

import './App.css';

// helper functions
import API from "./utils/API";

class App extends Component {
  state = {
    isLoggedIn: false,
    source: "bleacher-report"
  }

  
  componentWillMount(){
    this.checkAuth();

    API.getNews(this.state.source).then(news => {

      this.setState({
      ["stories"]: [...news.data]
      }, () => {
        this.setState({["refresh"]: true}) 
      console.log(this.state.stories)
    })
    })
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    }, data => {
      console.log(this.state.source)
      this.autocomplete()
    })
  }

  checkAuth(){
   API.checkAuth()
    .then(data => {return data.json()})
    .then(response => {
      // console.log(response);
      this.setState({
        isLoggedIn: response
      })
    })
    .catch(err => console.log("err", err));
  }

  handleSubmitAccess(e){
    if(this.refs.submitForm.reportValidity()) {
      e.preventDefault();

      const userData = {
        email:    document.getElementById("user-email").value,
        local_pw: document.getElementById("user-pw").value
      }
    
      let selectedButton = e.target.innerText;
      selectedButton = selectedButton.toLowerCase();

      this.refs.submitForm.reset();

      selectedButton === "signup" ?  this.handleSignup(userData) : this.handleLogin(userData)
    }
  }

  handleLogin(userData){
      API.handleLogin(userData)
      .then(data => {return data.json()})
      .then(response=>{
        if(response === true){
          this.setState({
            isLoggedIn: response
          }) 
        }
        else {
          const errorWrap = document.getElementById("form-error");
          errorWrap.innerText = "UH-OH! Please try again.";
          errorWrap.className += "error";
        } 
      })
      .catch(err=> console.log("err",err));
  }

  handleSignup(userData){
      API.handleSignup(userData)
      .then(data => data.json())
      .then(response=>{
        if(response === true){
          this.setState({
            isLoggedIn: response
          }) 
        }
        else {
          const errorWrap = document.getElementById("form-error");
          errorWrap.innerText = "UH-OH! Please try again.";
          errorWrap.className += "error";

        } 
        
      })
      .catch(err=> console.log("err",err));
  }

  handlelogout(){
    API.handlelogout()
    .then(data => {return data.json()})
    .then(response=>{
      console.log(response)
      this.setState({
        isLoggedIn: response
      })
    })
    .catch(err=> console.log("err",err))
  }

  resetError(){
    const errorWrap = document.getElementById("form-error");
    errorWrap.innerText = "";
    errorWrap.classList.remove("error");
  }


  // AUTOCOMPLETE =========================

   autocomplete(inp) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < sources.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (sources[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + sources[i].substr(0, val.length) + "</strong>";
            b.innerHTML += sources[i].substr(val.length);
            /*insert a input field that will hold the current sourcesay item's value:*/
            b.innerHTML += "<input type='hidden' value='" + sources[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the sourcesow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the sourcesow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });

    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }

  // ===================================

  render() {
    return (

      // <Router>
      //   <Switch>
      //   <Route exact path="/" component={Home} />
      //   <Route exact path="/saved" component={Saved} />
      //   </Switch> 
      // </Router>  

      

      <div className="App">

      <Input name="source" type="text" onChange={this.handleChange}/>

      <form autocomplete="off" >
        <div class="autocomplete">
          <input id="myInput" type="text" placeholder="Country"/>
          <Input id="myInput" name="source" type="text" onChange={this.handleChange}/>
        </div>
        <input type="submit"/>
      </form>

       {this.state.stories ? this.state.stories.map(story => (
         <Story headline={story.title} img={story.urlToImage} description={story.description}/>
       )) : <p>ey</p>
      }

        {this.state.isLoggedIn ?  <div>
        <h3>Welcome to your account panel.</h3>
        <h4>♡</h4>
        <Button float="none" handleBtnClick={this.handlelogout.bind(this)}>logout</Button>
        </div> :  <div>
          <form ref="submitForm" onClick={this.resetError.bind(this)}>
            <p id="form-error"></p>
            <Input elementID="user-email" inputType="email" placeholder="email" img="email" required={true} size="3"/>
            <Input elementID="user-pw" inputType="password" placeholder="password" img="password" required={true} size="6"/>
            <Button handleBtnClick={this.handleSubmitAccess.bind(this)} float="left">LOGIN</Button>
            <Button handleBtnClick={this.handleSubmitAccess.bind(this)} float="right">SIGNUP</Button>

          </form>
        </div>}

      </div>
    );
  }
}

export default App;
