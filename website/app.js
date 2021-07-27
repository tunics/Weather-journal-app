/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "963aedb9dd2f04deda54db1231cdcecc";
const iconURL = "http://openweathermap.org/img/wn/";
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
let zip = "";
let feelings = "";

const zipTest = 10009; //TODO: delete later

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Async POST
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

//Async get zip code weather
const getZipWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + "&appid=" + key);

    try {
        const allData = await res.json();
        return allData;
    } catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
};

// Update UI
const updateUI = async () => {
    const request = await fetch("/allEntries");
    try {
        const allData = await request.json();
        document.getElementById("temp").innerHTML = allData[0].city;
    } catch (error) {
        console.log("error", error);
    }
};

// Generate journal
function generate(btn) {
    btn.addEventListener("click", function () {
        zip = zipInput.value;
        feelings = feelingsInput.value;

        getZipWeather(baseURL, zip, apiKey)
            .then(function (data) {
                postData("/addEntry", {
                    city: data.name,
                    temp: data.main.temp,
                    icon: data.weather[0].icon,
                    date: newDate,
                    feeling: feelings,
                });
            })
            .then(updateUI);
    });
}

generate(generateBtn);
