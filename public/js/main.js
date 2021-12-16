const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');


const datahide = document.querySelector('.middle_layer');


const getInfo = async (event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    console.log(cityVal)

    if (cityVal === "") {
        city_name.innerText = 'Plz write the name before search';
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/find?q=${cityVal}&appid=fc4bd71801296ad8e03f7e35b1e19ec7&units=metric`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            const arrData = data.list;
            city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp + " C";
            let tempMood = arrData[0].weather[0].main;

            if (tempMood === "Clear") {
                console.log("Clll")
                temp_status.innerHTML = "<i class = 'fas fa-sun style ='color: #eccc68;'></i>"
            } else if (tempMood === "Clouds") {
                temp_status.innerHTML = "<i class = 'fas fa-cloud style ='color: #f1f2f6;'></i>"
            } else if (tempMood === "Rain") {
                temp_status.innerHTML = "<i class = 'fas fa-rain style ='color: #a4b0be;'></i>"
            } else {
                temp_status.innerHTML = "<i class = 'fas fa-sun style ='color: #eccc68;'></i>"
            }
            datahide.classList.remove('data_hide');
            cityName.value = ""

        }
        catch (err) {
            city_name.innerText = 'Plz enter the city name properly';
            datahide.classList.add('data_hide');
            console.error(err)
        }

    }
}


submitBtn.addEventListener('click', getInfo);