import React, { Component } from 'react';
class Weather extends React.Component{
     render(){
         console.log('data inside',this.props.data);
         const {data}=this.props;
         return(
          <div className="container">
            <h6>Date {data.date} </h6>
            <h6>Time {data.time} </h6>
            <h6>Humidity {data.humidity} </h6>
            <h6>Temperature {data.temp}</h6>
            <h6>Description of wether {data.weather.description}</h6>
             </div>
         );
     }
}

export default Weather;
