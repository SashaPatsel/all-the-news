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
import Autosuggest from 'react-autosuggest';




class App extends Component {
  state = {
    isLoggedIn: false,
    source: "bbc-news",
    currentFocus: 0,
    value: "bbc-news",
    suggestions: []
  }


  componentWillMount() {
    this.checkAuth();
    this.getNews();
  }

  handleChange = async e => {

    // auto.autocomplete(e.target, sources, this);
    const { name, value } = e.target
    console.log(value)
    this.setState({
      source: value
    }, () => console.log(this.state.source))
  }

  checkAuth() {
    API.checkAuth()
      .then(data => {
        console.log(data)
        return data.json()
      })
      .then(response => {
        console.log(response);
        this.setState({
          isLoggedIn: response
        })
      })
      .catch(err => console.log("err", err));
  }

  handleSubmitAccess(e) {
    if (this.refs.submitForm.reportValidity()) {
      e.preventDefault();

      const userData = {
        email: document.getElementById("user-email").value,
        local_pw: document.getElementById("user-pw").value
      }

      let selectedButton = e.target.innerText;
      selectedButton = selectedButton.toLowerCase();

      this.refs.submitForm.reset();

      selectedButton === "signup" ? this.handleSignup(userData) : this.handleLogin(userData)
    }
  }

  handleLogin(userData) {
    API.handleLogin(userData)
      .then(data => { return data.json() })
      .then(response => {
        if (response === true) {
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
      .catch(err => console.log("err", err));
  }

  handleSignup(userData) {
    API.handleSignup(userData)
      .then(data => data.json())
      .then(response => {
        if (response === true) {
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
      .catch(err => console.log("err", err));
  }

  handlelogout() {
    API.handlelogout()
      .then(data => { return data.json() })
      .then(response => {
        console.log(response)
        this.setState({
          isLoggedIn: response
        })
      })
      .catch(err => console.log("err", err))
  }

  resetError() {
    const errorWrap = document.getElementById("form-error");
    errorWrap.innerText = "";
    errorWrap.classList.remove("error");
  }




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


    API.getNews(this.state.value).then(news => {
      this.setState({
        stories: [...news.data]
      }, () => {
        this.setState({ refresh: false })
        console.log(this.state.stories)
      })
    })
  }


  // AUTOCOMPLETE

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : sources.filter(lang =>
      lang.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion;

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {

    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search A News Source',
      value,
      onChange: this.onChange
    };
    return (

      // <Router>
      //   <Switch>
      //   <Route exact path="/" component={Home} />
      //   <Route exact path="/saved" component={Saved} />
      //   </Switch> 
      // </Router>  



      <div className="home__container--main">
        <Nav>

          <form autocomplete="off" onSubmit={this.getNews} className="autosuggest">

            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
            <input type="submit" />
          </form>

          <div className="nav__auth">
            {this.state.isLoggedIn ? <div>

              <Button float="none" handleBtnClick={this.handlelogout.bind(this)}>logout</Button>
            </div> : <div className="nav__auth">
                <form ref="submitForm" onClick={this.resetError.bind(this)}>
                  <p id="form-error"></p>
                  <Input elementID="user-email" inputType="email" placeholder="email" img="email" required={true} size="3" />
                  <Input elementID="user-pw" inputType="password" placeholder="password" img="password" required={true} size="6" />
                  <Button handleBtnClick={this.handleSubmitAccess.bind(this)} float="left">LOGIN</Button>
                  <Button handleBtnClick={this.handleSubmitAccess.bind(this)} float="right">SIGNUP</Button>

                </form>
              </div>}
          </div>
        </Nav>



        <div className="home__container--stories">
          {this.state.stories ? this.state.stories.map(story => (
            <Story headline={story.title} img={story.urlToImage} description={story.description} link={story.url}/>
          )) : <p>NEWS</p>
          }

        </div>

      </div>
    );
  }
}

export default App;
