import React, { Component } from 'react';

class Request extends Component {
  constructor(props) {
    super(props);

    const API_KEY = process.env.REACT_APP_API_KEY
    const URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey="

      this.state = {
      url: URL + API_KEY,
      response: null
    };
  }

  componentWillMount() {
  this.getData();
  }

  getData () {
    fetch(this.state.url).then(r => r.json())
    .then((data) => {this.updateState(data)})
    .catch(e => console.log("Error"))
  }

  updateState(data) {
  this.setState({
    response: data
  })
}


  render() {
    if (this.state.response) {
      return (<p className="request">Microsoft latest share price : {this.state.response["Time Series (Daily)"]["2017-07-14"]["4. close"]}</p>);
    } else {
      return (
        <p></p>
      );
    }
  }
};


export default Request;
