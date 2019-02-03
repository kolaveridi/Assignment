
import React, { Component } from 'react';
import Weather from './Weather';
let dates = new Set();
class ListWeather extends React.Component{
    constructor(props){
        super(props);
        this.state={
            today:[]
        };
    }
    updateWeather=(date)=>{
          console.log('date is ',date);
         let todaydata=[];
         for(let i=0;i<this.props.data.length;i++){
              let item =this.props.data[i];
              console.log('item',item);
              let newDate=item.date;
              let datetocompare=date;
              if(newDate ===  datetocompare){
                  todaydata=[...todaydata,item];
              }
              this.setState({
                today:todaydata
            });


         }
         console.log('todaydata',todaydata);


     }




    renerBlock =()=>{
        let arr=[];
        dates.forEach( date => {
           arr.push(
               <div  key ={date} className="date-button">
               <button onClick={()=>this.updateWeather(date)}>{date} </button>
               </div>
           )
        });
        return arr;
    }

    render(){
        console.log('log',this.state.today);
        const {error,errormessage, data}=this.props;

        //let's mke something out of data coming from resoponse
        if(!error){
            // we have the data because there is no error such as 404
            let weatherdata=data;

            for(let i=0;i<weatherdata.length;i++){
                 console.log(weatherdata[i].date);

                 let value=weatherdata[i].date;
                 console.log(typeof value);
                dates.add(value);


            }



        }


        return(
          <div>
            Weather forecasts show
            {
              error ?
               <h1>{errormessage.toUpperCase()}</h1>
               :null
            }
            {this.renerBlock()}
            
            {
                 this.state.today.map(item => {
                            return (
                                <Weather
                                    data={item}
                                />
                            );
                        })


            }


          </div>

        );
    }

}
export default ListWeather;
