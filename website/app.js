/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "963aedb9dd2f04deda54db1231cdcecc";
const iconURL = "http://openweathermap.org/img/wn/";
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
const entryHolder = document.getElementById("entryHolder");
const caption = document.getElementById("caption");
let zip = "";
let feelings = "";

const zipTest = 10009; //TODO: delete later

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

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
    const res = await fetch(baseURL + zip + "&appid=" + key + "&units=metric");

    try {
        const allData = await res.json();
        return allData;
    } catch (error) {
        console.log("error", error);
    }
};

// Update UI
const updateUI = async () => {
    const request = await fetch("/allEntries");
    try {
        const allData = await request.json();

        // Display info
        entryHolder.style.display = "grid";

        // Last insertion
        lastData = allData.length - 1;

        // Remove error
        caption.classList.remove("error");
        zipInput.classList.remove("error");

        // Insert data
        document.getElementById(
            "icon"
        ).src = `http://openweathermap.org/img/wn/${allData[lastData].icon}@2x.png`;
        document.getElementById("temp").innerHTML =
            Math.round(allData[lastData].temp) + "ºC";
        document.getElementById("city").innerHTML = allData[lastData].city;
        document.getElementById("date").innerHTML = allData[lastData].date;
        document.getElementById("content").innerHTML =
            allData[lastData].feeling;
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
                    feelings: feelings,
                });
            })
            .then(updateUI)
            .catch((err) => {
                handleError();
            });
    });
}

function handleError() {
    caption.classList.add("error");
    zipInput.classList.add("error");
    zipInput.value = "";
}

generate(generateBtn);
