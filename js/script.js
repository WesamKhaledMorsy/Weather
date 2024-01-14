// const navBarList = document.querySelectorAll('.nav-link');
const searchInput= document.getElementById('find-city');
const findButton= document.getElementById('findBtn');

// // nav bar activation
// const navbarArray = [...navBarList];
// function makeActive() {
//     let index = 0;
//     for (let i = 0; i < navbarArray.length; i++) {
//         navbarArray[i].addEventListener('click', (e) => {
//             e.currentTarget.classList.add('active');
//             index = navbarArray.indexOf(navbarArray[i]);          
//             removeActive(index)
//         })
//     }
// }
// function removeActive(_index) {
//     for (let i = 0; i < navbarArray.length; i++) {
//         if (_index != i ) {
//             navbarArray[i].classList.remove('active');
//         }                
//     }
// }
// makeActive()

// get weather data

let city = 'Cairo';
let weatherList = [];
let alldata= [];
async function getWeather(){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d64838192a314b73bcc144253241001&q=${city}&days=3`);
    let result =await data.json();
    weatherList=[...result.forecast.forecastday];
    alldata = result;    
}
getWeather().then(function(){
    displayWeatherData(weatherList,alldata.location.name)
});

async function SearchCityWeather(_city){    
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d64838192a314b73bcc144253241001&q=${_city}&days=3`);
    let result =await data.json();
    displayWeatherData(result.forecast.forecastday,_city)
 }
 

async function displayWeatherData(list,currentCity){
    let tomorrow = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let afterTomorrow = new Date();
    afterTomorrow.setUTCDate(tomorrow.getUTCDate() + 2);
    let data = `
    <div class="col-md-4 col-sm-12">
                                <div class="card text-center">
                                    <div class="card-header">
                                        <ul>
                                            <li>${new Date().toLocaleDateString('en-US', options)}</li>
                                            
                                        </ul>                                      
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">${currentCity}</h5>
                                        <p class="card-text"> ${list[0].day.avgtemp_c} <span> <img src="https:${list[0].day.condition.icon}" alt="weather"></span></p>
                                        <a href="#" class="text-primary ">${list[0].day.condition.text}</a>
                                    </div>
                                    <div class="card-footer text-muted">
                                        <ul>
                                            <li><i class="fa-solid fa-umbrella"></i> ${list[0].day.totalsnow_cm}%</li>
                                            <li><i class="fa-solid fa-wind"></i> ${list[0].day.maxwind_kph}%</li>
                                            <li><i class="fa-solid fa-compass"></i> ${list[0].hour[0].wind_dir}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-12">
                                <div class="card">
                                    <div class="card-header text-center">
                                            <p>${tomorrow.toLocaleDateString('en-US', options)}</p>                                                               
                                    </div>
                                    <div class="card-body text-center">
                                        <p> <img src="https:${list[1].day.condition.icon}" alt="weather"></p>
                                        <p class="card-text tempUp">  ${list[1].day.maxtemp_c} C  </p>
                                        <p class="card-text tempDown">${list[1].day.mintemp_c} C  </p>
                                        <a href="#" class="text-primary ">${list[1].day.condition.text}</a>
                                    </div>
                                    
                                </div>
                            </div>  
                            <div class="col-md-4 col-sm-12">
                                <div class="card">
                                    <div class="card-header text-center">
                                            <p>${afterTomorrow.toLocaleDateString('en-US', options)}</p>                                                               
                                    </div>
                                    <div class="card-body text-center">
                                        <p> <img src="https:${list[2].day.condition.icon}" alt="weather"></p>
                                        <p class="card-text tempUp"> ${list[2].day.maxtemp_c} C  </p>
                                        <p class="card-text tempDown"> ${list[2].day.mintemp_c}C  </p>
                                        <a href="#" class="text-primary ">${list[2].day.condition.text}</a>
                                    </div>
                                    
                                </div>
                            </div>
    `;
        document.getElementById('weatherDisplay').innerHTML= data;
 }

 //events 
 findButton?.addEventListener('click',()=>{
    SearchCityWeather(searchInput.value)
 });





