import React from 'react'
import {useState,useEffect} from 'react'
import './style.css'
import axios from 'axios'

function App(){

  const[data,setData]=useState({
    celcius:10,
    name:"London",
    humidity:10,
    speed:2,
    image:"/Images/cloudy.png"
  })
  const[name,setName]=useState('');


  const handleClick=()=>{
    if(name !==""){
      const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cc90b6d712e4fd76a6cce85061de3415`;
    axios.get(apiUrl)
      .then(res=>{
        let imagePath="";
        if(res.data.weather[0].main=="Clouds"){
          imagePath="/Images/cloudy.png"
        }
        else if(res.data.weather[0].main=="Clear"){
          imagePath="/Images/clear.png"}
          else if(res.data.weather[0].main=="Rain"){
            imagePath="/Images/Rain.png"}
            else if(res.data.weather[0].main=="Drizzle"){
              imagePath="/Images/Drizzle.png"}

              else if(res.data.weather[0].main=="Mist"){
                imagePath="/Images/Drizzle.png"}
                else{
                  imagePath="/Images/cloudy.png"}
              
  


        console.log(res.data);
        setData({...data,celcius:res.data.main.temp,name:res.data.name,humidity:res.data.main.humidity,speed:res.data.wind.speed,image:imagePath})
      })
      .catch(err=>console.log(err))
    }
  }
  return(
 
  <div className="container">
  <h1> Madhan Weather App</h1>
    <div className="weather">
      <div className="search">
        <input type="text" placeholder='Enter City'
        onChange={e=>setName(e.target.value)}
         />
       <button><img src="/Images/images.png" onClick={handleClick} alt="madhan" /></button>
      </div>
      <div className='Winfo'>
        <img className="icon" src={data.image} />
        <h1>{Math.round((data.celcius)-273.15)}°C</h1>
        <h2>{data.name}</h2>
        <div className='details'>
          <div className='col'>
          <img src="/Images/humidity.png" />
          <div className='humidity'>
          <p>{Math.round(data.humidity)}%</p>
          <p>Humidity</p>
          </div>
          </div>
          <div className='col'>
        <img src="/Images/wind.png" />
        <div className='wind'>
        <p>{Math.round(data.speed)} km/h</p>
          <p>Wind</p>
          </div>
        </div>
        </div>
       
      </div>
    </div>
  </div>




);
};
export default App;