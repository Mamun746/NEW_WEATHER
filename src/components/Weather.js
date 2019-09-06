import React,{useState,useEffect} from 'react';

const apiKey='93035ff64b779e81b5a5f805d8067fc3' 
const url='http://api.openweathermap.org/data/2.5/weather'

const Weather = () => {
    const [location,setLocation]=useState('')
    const [data,setData]=useState(null)
    const [message,setMessage]=useState('Type a city to find weather')


    const handleSubmit=(e)=>{
        e.preventDefault()
        updateData(`${url}?${location},bd&APPID=${apiKey}`)
    }

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            pos=>{
                const [latitude,longitude]=pos.coords
                updateData(`${url}?lat=${latitude}&lon=${longitude},&APPID=${apiKey}`)
            },
            _err=>{
                setMessage('could not detect location')
            }
        )
    },[])

    const updateData=(url)=>{
        fetch(url)
        .then((response)=>{
            return response.json()  
            
        })
        .then((response)=>{
           if(response.cod===200){
               setData(response)
               console.log(response);
               
           }else{
               setMessage('City not Found ')
               setData(null)
              
           }
            
        })
        .catch((error)=>{
           setMessage('Could not fetch weather data')
           setData(null)
          
           
            
        })
    }

   
    


    return (
        <div>
            <h1>Weather-App</h1>
            <div>Current location {location}</div>
           <form onSubmit={handleSubmit}>
           <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)}/>
           </form>
           {
               data && data.cod===200?(
                   <div>
                   <img alt={data.weather[0].description}src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                    <h3>{Math.round(data.min.temp-273)}C</h3>
                    <p>
                    Humidity:{data.min.humidity}
                    Pressure:{data.min.pressure} pha
                    </p>
                   
                   
                   </div>
               ):
               (<div>
                {message}
                </div>)
           }
           
        </div>
    );
};

export default Weather;