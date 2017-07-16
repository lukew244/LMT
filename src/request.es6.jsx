import React, { Component } from 'react';

class Request extends Component {
  constructor(props) {
    super(props);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=";

    this.state = {
      url: URL + API_KEY,
      response: null,
      date: null
    };
  }

  getData () {
    fetch(this.state.url).then(res => res.json())
    .then((data) => {this.updateState(data);})
    .catch(e => console.log("Error"));
  }

  handleDateChange(date) {
    const dateString = date.target.value.toString();
    this.setState({ date: dateString });
  }

  handleButtonClick() {
    this.getData();
  }

  updateState(data) {
    this.setState({
      response: data
    });
  }


  render() {
    if (this.state.response) {
      console.log(this.state.response);
      return (
        <p className="request">
          Microsoft  share price : {this.state.response["Time Series (Daily)"][this.state.date]["4. close"]}
        </p>
      );
    } else {
      return (
        <div>
          <input type="date" onChange={this.handleDateChange.bind(this)}/>
          <button onClick={this.handleButtonClick.bind(this)}>Search</button>
        </div>
      );
    }
  }
};


export default Request;
