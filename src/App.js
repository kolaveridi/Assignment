import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

import ListWeather from './Components/ListWeather';
let API_KEY='4b57ce179f3560a914e8e19f3feaba5b';
let dates=[];
class App extends Component {

    constructor(props){
        super(props);
        this.state={
            city:'',
            country:'',
            errormessage:'',
            error:false,
            response:''
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
    onSubmit =(event)=>{

        let city = event.target.elements.city.value;
        let country = event.target.elements.country.value;
        event.preventDefault();
        this.loadWeather(city,country);
    }
    loadWeather =async(city,country)=>{


      let url=`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}`;

      const api_call = await fetch(url);
      const result = await api_call.json();

      if(result.cod==='404'){
          this.setState({
              errormessage:result.message,
              error:true,
              response:[]
          });
      }
      else{

          this.setState({

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

    console.log('response',this.state.response);
    return (
      <div className="App">
         <h1> Weather App </h1>
          <h6>Weather forecasts show</h6>
           <form onSubmit ={this.onSubmit }>
              <div className="main-container">
                 <input
                    onChange ={(event)=>this.onChangeCity(event)}
                    placeholder='City '
                    value ={this.state.city}
                    name='city'
                  />
                  <input
                     onChange ={(event)=>this.onChangeCountry(event)}
                     placeholder='Country'
                     value ={this.state.country}
                     name='country'
                   />
                 < button

                  type="submit"
                  >Submit </button>
               </div>
             </form>
          <ListWeather
          data={this.state.response}
          error={this.state.error}
          errormessage={this.state.errormessage}
          />
      </div>
    );
  }
}

export default App;
