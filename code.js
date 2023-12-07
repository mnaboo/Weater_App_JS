let lat
let long
const apikey = "ed66ffa04b0baf40c3ca2f64ab6e0c8c"

function startApp(){
    console.log("Hello World")

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude
                long = position.coords.longitude

                console.log(`latitude: ${lat}\nlongitude: ${long}`)

                getWeatherData()
            }
        )
    }
}

function getWeatherData(){
    
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apikey}`

    console.log(url)

    fetch(url).then(function(response){
        console.log(typeof(response))
        response.json().then(function(data){
            console.log(data)
            updateWeatherData(data)
        })
    })
    
    
}
function updateWeatherData(data){

    const temp = data.main.temp 
    document.getElementById("temp").innerHTML = `${temp} &degC`

    const hum = data.main.humidity
    document.getElementById("humidity").innerHTML = `${hum} %`

    const pressure = data.main.pressure
    document.getElementById("pressure").innerHTML = `${pressure} Ha`

    const cloud = data.clouds.all
    document.getElementById("cloud").innerHTML = `${cloud} %`

    const wind = data.wind.speed
    document.getElementById("wind").innerHTML = `${wind} km/h`

    const date = new Date(data.sys.sunrise * 1000)
    const sunrise = date.getHours()+":"+date.getMinutes()
    document.getElementById("sun").innerHTML = `${sunrise} AM`

    const date1 = new Date(data.sys.sunset * 1000)
    const dawn = date1.getHours()+":"+date1.getMinutes()
    document.getElementById("dawn").innerHTML = `${dawn} PM`

    let imgURL = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    document.getElementById("img").setAttribute("src",imgURL)

    const city = data.name
    document.getElementById("locationLink").innerHTML = city
    const locationLink = document.getElementById("locationLink")
    locationLink.href = `https://openstreetmap.org/#map=9/${lat}/${long}`


}
