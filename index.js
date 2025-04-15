const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "be4075c63f1ff43d7811b8427aed76fb";

weatherForm.addEventListener('submit' , async  event => {
    event.preventDefault();
    const city = cityInput.value ;
    if(city){
        try {
            const weatherData =await getWeatherdata(city);
            displayWeatherInfo(weatherData); 

        }
        catch(error){
            displayError(error);
        }
    }
    else {
        displayError("please Enter a city")
    }
    
});

async function getWeatherdata (city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    try {    
        const response = await fetch(apiurl);
        if(! response.ok){
            throw new Error ("could not fetch ressource")
        }
        
        const data = await response.json();
        console.log(data)
        return data
    }
    catch (error){
        console.log(error);
        displayError(error);
    }
}

function displayWeatherInfo(data){
    const {
        name : city ,
        main : {temp , humidity} ,
        weather : [{ description , id }]} = data;

    card.textContent = "";
    card.style.display ="flex" ;
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    cityDisplay.textContent = city;
    card.appendChild(cityDisplay);
    cityDisplay.classList.add("cityDisplay");

    tempDisplay.textContent = `${(temp - 273.5).toFixed(2)}°C` ;
    card.appendChild(tempDisplay);
    tempDisplay.classList.add("tempDisplay");

    humidityDisplay.textContent = `humidity : ${humidity } %`; 
    card.appendChild(humidityDisplay);
    humidityDisplay.classList.add("humidityDisplay");

    descDisplay.textContent = description ;
    card.appendChild(descDisplay)
    descDisplay.classList.add("descDisplay")
    
    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji")
    card.appendChild(weatherEmoji);
    }

function getWeatherEmoji (weatherId){
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }

}


function displayError(message){
    
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message ;
    errorDisplay.classList.add("errorDisplay");
    card.textcontent ="";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}