
let ob=document.getElementById("weatherform");
function fetchdetails(city)
{
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=0cac13365233bd824eef684f9aee323d`).
    then(res=>res.json())
    .then((res)=>{
        let cityname=document.getElementById('cityName');
        if(res.length==0)
        {   
            alert('This City doesnot exist');
            cityname.value="";
            return;
        }
        document.querySelector("#countryname").innerText = "Weather In " + res[0].name ;
        let lat=res[0].lat;
        let lon=res[0].lon;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0cac13365233bd824eef684f9aee323d`).
        then(res=>res.json()).then(res=>{
        console.log(res);
        displayWeather(res);
        cityname.value=""; //clear input box
    });
    })
}

ob.addEventListener('submit',(e)=>{
    e.preventDefault();
    let cityname=document.getElementById('cityName'); //inputbox
    fetchdetails(cityname.value); //input box value
})

function displayWeather(data)
{
    // const name=nameofcity;
    const description= data.weather[0].description;
    const icon=data.weather[0].icon;
    const{temp, humidity}= data.main;
    const {speed } =data.wind;
    console.log(name,description,temp,humidity,speed);
    // document.querySelector("#countryname").innerText = "Weather In " + name ;
    document.querySelector("#temperature").innerText = (temp-273.15).toFixed(3) +"°C";
    document.querySelector("#description").innerText = description;
    document.querySelector("#humidity").innerText = "Humidity : " + humidity;
    document.querySelector("#wind").innerText = "Wind Speed : " + speed +"km/hr";
    //document.querySelector( ".icon").src=
}
