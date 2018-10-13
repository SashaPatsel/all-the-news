import React, { Component } from 'react';

import logo from './beary2.png';

import Button from './components/Button'
import Input from './components/Input'
import Nav from "./components/Nav"
import Panel from './components/Panel'
import Story from './components/Story'
import Source from './components/Source'

import sources from "./data/sources"

import './App.css';

// helper functions
import API from "./utils/API";
import auto from "./utils/autocomplete"

class App extends Component {
  state = {
    isLoggedIn: false,
    source: "",
    currentFocus: 0
  }

  
  componentWillMount(){
    this.checkAuth();
  }

  handleChange = async e => {
    
    auto.autocomplete(e.target, sources, this);
    const {name, value} = e.target
    console.log(value)
    this.setState({
      source: value
    }, () => console.log(this.state.source))
  }

  checkAuth(){
   API.checkAuth()
    .then(data => {
      console.log(data)
      return data.json()})
    .then(response => {
      console.log(response);
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

    autocomplete = (inp, arr, autocomp) => {
      /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
  
      /*execute a function when someone writes in the text field:*/
  
      inp.addEventListener("input", async function(e) {
          var a, b, i, val = this.value;
          /*close any already open lists of autocompleted values*/
          closeAllLists();
          if (!val) { return false;}
         await autocomp.setState({
            currentFocus: -1
          })
          /*create a DIV element that will contain the items (values):*/
          a = document.createElement("DIV");
          a.setAttribute("id", this.id + "autocomplete-list");
          a.setAttribute("class", "autocomplete-items");
          /*append the DIV element as a child of the autocomplete container:*/
          this.parentNode.appendChild(a);
          /*for each item in the array...*/
          for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
              /*create a DIV element for each matching element:*/
              b = document.createElement("DIV");
              /*make the matching letters bold:*/
              b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(val.length);
              /*insert a input field that will hold the current array item's value:*/
              b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
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
      inp.addEventListener("keydown", async function(e) {
        
          var x = document.getElementById(this.id + "autocomplete-list");
  
          if (x) x = x.getElementsByTagName("div");
          if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
           await autocomp.setState({
             currentFocus: autocomp.state.currentFocus + 1
           })
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            autocomp.setState({
              currentFocus: autocomp.state.currentFocus -1 
            })
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            console.log(autocomp.state.source)
            e.preventDefault();
            if (autocomp.state.currentFocus > -1) {
              /*and simulate a click on the "active" item:*/
              if (x) x[autocomp.state.currentFocus].click();
              autocomp.setState({
                source: document.getElementById("myInput").value 
              }, () => console.log(autocomp.state.source))
            }
          }
      });
      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (autocomp.state.currentFocus >= x.length) autocomp.state.currentFocus = 0;
        if (autocomp.state.currentFocus < 0) autocomp.state.currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[autocomp.state.currentFocus].classList.add("autocomplete-active");
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

  setSource(src) {
    this.setState({
      source: src
    })
    this.getNews()
  }

  getNews = e => {
    if (e) {
      e.preventDefault()
    }
    
    console.log(this.state.source)
    API.getNews(this.state.source).then(news => {
      console.log(news)
      this.setState({
      stories: [...news.data]
      }, () => {
        this.setState({refresh: false}) 
      console.log(this.state.stories)
    })
    })
  }

  render() {
    return (

      // <Router>
      //   <Switch>
      //   <Route exact path="/" component={Home} />
      //   <Route exact path="/saved" component={Saved} />
      //   </Switch> 
      // </Router>  

      

      <div className="App">
        <Nav>
        {this.state.isLoggedIn ?  <div>
        
        <Button float="none" handleBtnClick={this.handlelogout.bind(this)}>logout</Button>
        </div> :  <div className="nav__auth">
          <form ref="submitForm" onClick={this.resetError.bind(this)}>
            <p id="form-error"></p>
            <Input elementID="user-email" inputType="email" placeholder="email" img="email" required={true} size="3"/>
            <Input elementID="user-pw" inputType="password" placeholder="password" img="password" required={true} size="6"/>
            <Button handleBtnClick={this.handleSubmitAccess.bind(this)} float="left">LOGIN</Button>
            <Button handleBtnClick={this.handleSubmitAccess.bind(this)} float="right">SIGNUP</Button>

          </form>
        </div>}
        </Nav>  
      

      <form autocomplete="off" onSubmit={this.getNews}>
        <div class="autocomplete">
        
          <Input placeholder="Search News Source"  elementID="myInput" name="source" type="text" onChange={this.handleChange}/>
        </div>
        <input type="submit"/>
      </form>
      <Source source="Bleacher Report" onClick={() => this.setSource("bleacher-report")}/>
       {this.state.stories ? this.state.stories.map(story => (
         
         <Story headline={story.title} img={story.urlToImage} description={story.description}/>
       )) : <p>ey</p>
      }

 

      </div>
    );
  }
}

export default App;
