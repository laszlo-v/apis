"use strict";

(() => {
  const unsplashImage1 = document.querySelector(".img-1");
  const unsplashImage2 = document.querySelector(".img-2");
  const pexelsImage1 = document.querySelector(".img-3");
  const pexelsImage2 = document.querySelector(".img-4");
  const pixabayImage1 = document.querySelector(".img-5");
  const pixabayImage2 = document.querySelector(".img-6");
  const country = document.querySelector(".country");
  const restForm = document.querySelector(".rest-form");
  const restFlag = document.querySelector(".rest-flag");
  const capital = document.querySelector(".capital");
  const borders = document.querySelector(".borders");
  const callingCodes = document.querySelector(".calling-codes");
  const currencies = document.querySelector(".currencies");
  const population = document.querySelector(".population");
  const region = document.querySelector(".region");
  const timeZone = document.querySelector(".time-zone");
  const topLevelDomain = document.querySelector(".top-level-domain");
  const unsplashAPIKey = "MQSj0XkiTqUE6c0j6_lSlBvYgUPJV7-9MY2WTF6r1qA";
  const pexelsAPIKey =
    "tIl1Xvbh6xePkmaCLnEZOOidXxOFvUzU9gT2NU6zF4NMlJdsgqlo4kKl";
  const pixabayAPIKey = "38333076-34da91baf7d706ea593606e0f";
  const weatherCity = document.querySelector(".weather-city");
  const weatherState = document.querySelector(".weather-state");
  const weatherIcon = document.querySelector(".weather-icon");
  const weatherForm = document.querySelector(".weather-form");
  const temp = document.querySelector(".temp");
  const description = document.querySelector(".description");
  const humidity = document.querySelector(".humidity");
  const pressure = document.querySelector(".pressure");
  const wind = document.querySelector(".wind");
  const sunsrise = document.querySelector(".sunrise");
  const sunset = document.querySelector(".sunset");

  let speech = window.speechSynthesis;

  let inputTxt = document.querySelector(".txt");
  let inputForm = document.querySelector("form");
  let voiceSelect = document.querySelector("select");
  let pitch = document.querySelector("#pitch");
  let pitchValue = document.querySelector(".pitch-value");
  let rate = document.querySelector("#rate");
  let rateValue = document.querySelector(".rate-value");

  let playBtn = document.querySelector("#play");
  let voices = [];

  //getting images from unsplash
  const fetchFromUnsplash = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/?client_id=${unsplashAPIKey}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        unsplashImage1.src = data[5].urls.small;
        unsplashImage2.src = data[9].urls.small;
      } else {
        console.log(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(`Oops something went wrong ${error}`);
    }
  };

  fetchFromUnsplash();

  // getting images from pexels

  const fetchPexels = async () => {
    try {
      const response = await fetch(
        "https://api.pexels.com/v1/search?query=nature",
        {
          headers: {
            Authorization: pexelsAPIKey,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        pexelsImage1.src = data.photos[0].src.original;
        pexelsImage2.src = data.photos[1].src.original;
      } else {
        console.log(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(`Oops something went wrong ${error}`);
    }
  };

  fetchPexels();

  // getting images from pixabay

  const fetchPixabay = async () => {
    try {
      const response = await fetch(
        "https://pixabay.com/api/?key=" +
          pixabayAPIKey +
          "&q=" +
          encodeURIComponent("red roses")
      );
      if (response.ok) {
        const data = await response.json();
        pixabayImage1.src = data.hits[0].userImageURL;
        pixabayImage2.src = data.hits[1].userImageURL;
      } else {
        console.log(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(`Oops something went wrong ${error}`);
    }
  };

  fetchPixabay();

  //restcountries.com - data
  const restCountries = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v2/name/${country.value.toLowerCase()}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        restFlag.src = data[0].flag;
        capital.textContent = `The capital city of ${data[0].name} is: ${data[0].capital}`;
        borders.textContent = `The borders are: ${data[0].borders}`;
        callingCodes.textContent = `The calling code is: ${data[0].callingCodes}`;
        currencies.textContent = `Currency - code: ${data[0].currencies[0].code}, name: ${data[0].currencies[0].name}, symbol: ${data[0].currencies[0].symbol}`;
        population.textContent = `Population: ${data[0].population}`;
        region.textContent = `Region: ${data[0].region}`;
        timeZone.textContent = `Timezone: ${data[0].timezones}`;
        topLevelDomain.textContent = `Top Level Domain: ${data[0].topLevelDomain}`;
      } else {
        console.log(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  restForm.addEventListener("submit", (e) => {
    e.preventDefault();
    restCountries();
    country.value = "";
  });

  /********************* weather api *********** */
  const kelvinToCelsius = (temp) => {
    const celsius = temp - 273.15;
    return celsius.toFixed(1) + "°C";
  };
  const convertSecondsToDate = (seconds) => {
    const data = new Date(seconds * 1000).toISOString().slice(11, 19);
    return data;
  };
  const fixCase = (city) => {
    let newCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    return newCity;
  };

  const getWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value},${weatherState.value}&appid=3288931c57d664e1613a7c325740423b`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp.textContent = `The temperature in ${fixCase(
          weatherCity.value
        )} is: ${kelvinToCelsius(data.main.temp)}`;
        description.textContent = `${fixCase(data.weather[0].description)}`;
        humidity.textContent = `Humidity is: ${data.main.humidity}%`;
        pressure.textContent = `The barometric pressure is: ${data.main.pressure}mbar`;
        wind.textContent = `Wind: ${data.wind.speed}km/h`;
        sunsrise.textContent = `Sunrise: ${convertSecondsToDate(
          data.sys.sunrise
        )}`;
        sunset.textContent = `Sunset: ${convertSecondsToDate(data.sys.sunset)}`;
        weatherCity.value = "";
        weatherState.value = "";
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeatherData();
  });
  /********************** leaflet *****************/
  ("use strict");
  const distance = document.querySelector(".distance");

  const getPosition = () => {
    if (!navigator.geolocation) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);

      function showPosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let mymap = L.map("mapid", { zoom: 13 }).setView([latitude, longitude]);

        // https://leaflet-extras.github.io/leaflet-providers/preview/
        // More info on: https://leafltjs.com/reference.html
        L.tileLayer("https://tile.osm.ch/switzerland/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mymap);

        let marker = L.marker([latitude, longitude]).addTo(mymap);
        let marker2 = L.marker(
          [53.34906872731995, -6.26006307679144],
          11
        ).addTo(mymap);
        marker2
          .bindPopup("<b>Our Location</b>", { autoClose: false })
          .openPopup();
        marker
          .bindPopup("<b>Your Estimated Location</b><br>", {
            autoClose: false,
          })
          .openPopup();

        let userLatitude = latitude;
        let userLongitude = longitude;
        let ourLatitude = 53.34906872731995;
        let ourLongitude = -6.26006307679144;

        const getDistance = (userLat, userLong, ourLat, ourLong) => {
          const earthRadius = 6371;

          const dLat = toRadian(ourLat - userLat);
          const dLong = toRadian(ourLong - userLong);

          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadian(userLat)) *
              Math.cos(toRadian(ourLat)) *
              Math.sin(dLong / 2) *
              Math.sin(dLong / 2);

          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const d = earthRadius * c;
          return d;
        };

        const toRadian = (degree) => {
          return degree * (Math.PI / 180);
        };

        const calculatedDistance = getDistance(
          userLatitude,
          userLongitude,
          ourLatitude,
          ourLongitude
        );

        distance.textContent = `You are approximately ${calculatedDistance.toFixed(
          2
        )} Km far from "Us"`;
      }
    }
  };

  getPosition();

  /********************** text to speech *****************/

  const populateVoiceList = () => {
    voices = speech.getVoices();

    for (let i = 0; i < voices.length; i++) {
      let option = document.createElement("option");

      option.textContent = voices[i].name + " (" + voices[i].lang + ")";

      if (voices[i].default) {
        option.textContent += " -- DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  };

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  playBtn.addEventListener("click", (e) => {
    let utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    let selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    speech.speak(utterThis);

    utterThis.onpause = function (event) {
      let char = event.utterance.text.charAt(event.charIndex);
      console.log(
        "Speech paused at character " +
          event.charIndex +
          ' of "' +
          event.utterance.text +
          '", which is "' +
          char +
          '".'
      );
    };

    inputTxt.blur();

    e.preventDefault();
  });

  pitch.onchange = function () {
    pitchValue.textContent = pitch.value;
  };

  rate.onchange = function () {
    rateValue.textContent = rate.value;
  };
})();
