import React,{useEffect,useState} from 'react';
import axios from 'axios'

const apiKey='93035ff64b779e81b5a5f805d8067fc3' 
const url='http://api.openweathermap.org/data/2.5/weather'


const NewWeather = () => {
    const [city,setCity]=useState('')
    const [country,setCountry]=useState('')
    const [data,setData]=useState(null)
    const [message,setMessage]=useState('Type a city to find weather')

   

    const handleSubmit=(e)=>{
        e.preventDefault()
        updateData(`${url}?q=${city},${country},&APPID=${apiKey}`)
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
        axios.get(url)
        .then((res)=>{ 
          if(res.data.cod===200){
             setData(res.data)  
             console.log(res.data);
               
          } else{
              setMessage('City not found')
          }
        })
        .catch((err)=>{
            setMessage('Unable to fetch data')
            
        })
    }
   
    

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
        <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)}/>
        <input type="submit" value="Get Weather"/>
        </form>
        {
            data && data.cod===200?(
                <div>
                <img style={{size:'40px'}} alt={data.weather[0].description} src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                 <h3>{Math.round(data.main.temp-273)}C</h3>
                 <p>
                 Humidity:{data.main.humidity}<br/>
                 Pressure:{data.main.pressure} pha<br/>
                 country:{data.sys.country};
                 sunrise:{data.sys.sunrise}<br/>
                 description:{data.weather[0].description}
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

export default NewWeather;