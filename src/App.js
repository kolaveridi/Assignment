import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

import ListWeather from './Components/ListWeather';
let API_KEY='4b57ce179f3560a914e8e19f3feaba5b';
class App extends Component {

    constructor(props){
        super(props);
        this.state={
            city:'',
            country:'',
            latitude:'',
            longitude:'',
            errormessage:'',
            error:false,
            response:'',
            cityinresponse:''
        };
    }
    onChangeCity =(event)=>{
        this.setState({
           city:event.target.value
       });
   }
   onChangeCountry =(event)=>{
       this.setState({
          country:event.target.value
      });
  }

    onSubmit = (event) => {
        event.preventDefault();
        const {city,country} = this.state;
        this.loadWeather(city,country);
    }



    loadWeather = async(city,country)=>{


      let url=`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}`;

      const api_call = await fetch(url);
      const result = await api_call.json();
      console.log('result',result);

      if(result.cod==='404'){
          this.setState({
              errormessage:result.message,
              error:true,
              response:[],
              cityinresponse:''
          });
      }
      else{

          this.setState({
              error:false,
              cityinresponse:result.city.name,
              response: result.list.map(item => ({
				date: item.dt_txt.split(" ")[0],
                time:item.dt_txt.split(" ")[1],
				temp: item.main.temp,
				humidity: item.main.humidity,
				weather: item.weather[0],
			}))

        });

      }

    }

  render() {

    console.log('response',this.state.cityinresponse);
    return (
      <div className="App">
         <h1> Weather App </h1>
          <h3>{this.state.cityinresponse}</h3>
           <form   onSubmit ={this.onSubmit }>
              <div className="form-container">
                 <input
                    className="input-container"
                    onChange ={(event)=>this.onChangeCity(event)}
                    placeholder='City '
                    value ={this.state.city}
                    required={true}
                    name='city'
                  />
                  <input
                    className="input-container"
                    onChange ={(event)=>this.onChangeCountry(event)}
                    placeholder='Country'
                    value ={this.state.country}
                    name='country'
                    required={true}
                   />
                 < button
                   className="button"

                  type="submit"
                  >Submit </button>
               </div>
             </form>

          <ListWeather
            city={this.state.cityinresponse}
            data={this.state.response}
            error={this.state.error}
            errormessage={this.state.errormessage}
          />
      </div>
    );
  }
}

export default App;
