const express = require('express');
const bodyParser = require('body-parser');
// import fetch from 'node-fetch';
const axios = require('axios')
const http = require('http');
const app = express();
// const route = require("./Routes/tracker");
app.use(express.static('public'));



app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/tracker",route);


app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');

});

app.get("/realtimeflights", function (req, res) {
    res.sendFile(__dirname + '/realtimeflights.html');
})

app.get("/airportracker", function (req, res) {
    res.sendFile(__dirname + '/trackbyairport.html');
})

app.post("/airportracker", function (req, res) {

    let apiKey = '0bfeebb9dd6c48088abde2a56888734a';  // Alternative Account Key (2kwattzs)
    let airportiata = req.body.airportiata;
    let url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${airportiata}`;

    axios.get(url).then((resp) => {

        console.log(resp.data);

        res.send(resp.data.data[0]);



    }).catch(
        (error) => {
            console.log(error);

        }
    )




    // http.get(url, function (response) {
    //     response.on('data', function (data) {
    //         data += data.toString();
    //     });
    //     response.on("end", function (data) {
    //         flightData = JSON.parse(data);
    //         console.log(data);
    //         let flightDate = flightData.data[0].flight_date;
    //         let flightStatus = flightData.data[0].flight_status;
    //         let flightDepAirport = flightData.data.departure.airport;
    //         let flightDepTimezone = flightData.data[0].departure.timezone;
    //         let airportIata = flightData.data[0].departure.iata;
    //         let airportIcao = flightData.data[0].departure.icao;
    //         let flightSchedule = flightData.data[0].departure.scheduled;
    //         let flightEstimate = flightData.data[0].departure.estimated;
    //         let flightActual = flightData.data[0].departure.actual;
    //         let estimatedRunway = flightData.data[0].departure.estimated_runway;
    //         let flightArrAirport = flightData.data[0].arrival.airport;
    //         let flightArrTimezone = flightData.data[0].arrival.timezone;
    //         let flightIata = flightData.data[0].arrival.iata;
    //         let flightIcao = flightData.data[0].arrival.icao;
    //         let flightTerminal = flightData.data[0].arrival.terminal;
    //         let gate = flightData.data[0].arrival.gate;
    //         let baggage = flightData.data[0].arrival.baggage;
    //         let flightDelay = flightData.data[0].arrival.delay;
    //         let airline = flightData.data[0].airline.name;
    //         let airlineIata = flightData.data[0].airline.iata;
    //         let airlineIcao = flightData.data[0].arrival.icao;
    //         let flightNumber = flightData.data[0].arrival.flight.number;
    //         let aircraft = flightData.data[0].aircraft;
    //         res.send(`DETAILS : ${flightDate}`);
    //     })
    // })


})

app.get("/iatatracker", function (req, res) {

    res.sendFile(__dirname + '/iatatracker.html');

})


app.post("/iatatracker", function (req, res) {

    let apiKey = '813f2a882281130e3ab0553fb90de559';
    let iataQuery = req.body.iatacode;
    let airlineIcaoQuery = req.body.flighticao;
    let url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&airline_icao=${airlineIcaoQuery}&flight_iata=${iataQuery}`;

    axios.get(url).then((result) => {
        // console.log(result.data);
        console.log(result.statusCode);

        function displayData() {

            function flight1() {

                let airlineName = result.data.data[0].airline.name;
                let airlineIata = result.data.data[0].airline.iata;
                let airlineIcao = result.data.data[0].airline.icao;
                let flightNumber = result.data.data[0].flight.number;
                let aircraft = result.data.data[0].aircraft;
                let flightDate = result.data.data[0].flight_date;
                let flightStatus = result.data.data[0].flight_status;
                let timezone = result.data.data[0].timezone;
                let dataToWrite = ` <h4> Entry 1 </h4>  <br> Airline Name ${airlineName} <br> Airline Iata  ${airlineIata} <br> Airline ICAO ${airlineIcao} <br> Flight Number ${flightNumber} <br> Aircraft ${aircraft} <br> Flight Date ${flightDate} <br> Flight Status ${flightStatus} <br> Timezone ${timezone} `;
                return dataToWrite;


            }

            return flight1();


        }
        function flight2() {
            let airlineName = result.data.data[1].airline.name;
            let airlineIata = result.data.data[1].airline.iata;
            let airlineIcao = result.data.data[1].airline.icao;
            let flightNumber = result.data.data[1].flight.number;
            let aircraft = result.data.data[1].aircraft;
            let flightDate = result.data.data[1].flight_date;
            let flightStatus = result.data.data[1].flight_status;
            let timezone = result.data.data[1].timezone;
            let dataToWrite = ` <h4> Entry 2 </h4> <br> Airline Name ${airlineName} <br> Airline Iata  ${airlineIata} <br> Airline ICAO ${airlineIcao} <br> Flight Number ${flightNumber} <br> Aircraft ${aircraft} <br> Flight Date ${flightDate} <br> Flight Status ${flightStatus} <br> Timezone ${timezone} `;
            return dataToWrite;


        };

        // let flightData1 = result.data.data[0];
        // let sFlightData = JSON.stringify(flightData1);

        res.send(`${displayData()} <br> ${flight2()}`);

    }).catch((err) => {
        console.log(err)
    });

    // http.get(url, function (response) {

    //     console.log(response.statusCode);
    //     response.on("data", function(data){


    //     })

    //     response.on("end", function (data) {
    //         const flightData = JSON.parse(data);


    //         const flightIcao = flightData.data[0].flight.iata;
    //         const flightIata = flightData.data.flight[3].iata;
    //         const flightNumber = flightData.data.flight.number;
    //         const flightCodeShared = flightData.data.flight.codeshared;
    //         const aircraft = flightData.data.aircraft;
    //         const airlineName = flightData.data.airline.name;
    //         const airlineIcao = flightData.data.airline.icao;
    //         const airlineIata = flightData.data.airline.iata;
    //         let flightDepartureAirport = flightData.data.departure.airport;
    //         let flightDepartureTimezone = flightData.data.departure.timezone;
    //         let flightDepartureDelay = flightData.data.departure.delay;
    //         let flightStatus = flightData.data.flight_status;
    //         res.send(` Entries : 1 <br>  Airline ICAO : ${airlineIcao} <br> Airline IATA : ${airlineIata} <br> Airline Name ${airlineName} Aircraft : ${aircraft} , Flight Icao : ${flightIcao} <br> Flight Status :  ${flightStatus}  <br> Departure From  : ${flightDepartureAirport} <br> Departure City Timezone : ${flightDepartureTimezone} <br> Flight Delay ( Probably in minutes , I have not read the documentation ^_^ ): ${flightDepartureDelay}`);
    //         res.end()


    //     });

    // });

});

app.post("trackbyairport", function (req, res) {

    console.log(req);
});

app.get("/weathertracker", function (req, res) {

    res.sendFile(__dirname + "/currentweather.html");
    console.log(res.statusCode);

});

app.post("/weathertracker", function (req, res) {

    let cityId = req.body.cityid;
    let apiKey = '5f0580b2537d3b20801d45e74d8f10b6';
    let url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;

    axios.get(url).then((result) => {
        console.log(result.data);

        function displayData() {

            let tempData = result.data.main.temp;
            let flTempData = result.data.main.feels_like;
            let pressure = result.data.main.pressure;
            let humidity = result.data.main.humidity;
            let showData = ` Temperature : ${tempData} \n Feels like ${flTempData} \n Pressure : ${pressure} \n Humidity : ${humidity} \n`;
            return showData;

        }

        res.send(`${displayData()}`);

    }).catch((err) => {
        console.log(err)
    });

})

app.get("/travelinsights", function (req, res) {

    console.log(req);
    res.sendFile(__dirname + "/travelinsights.html");
})

app.post("/travelinsights", function (req, res) {
    console.log(res.statusCode);
    let cityIata = req.body.cityiata;
    let period = req.body.period;


    // if (cityIata.length === 0) {

    //     res.send(`<script> alert("Dear sir, every submit counts... The High quality apis
    // we provide are not unlimited ! Please don't joke around with our website ad use only when upmost required ");</script>`);


    // }

    // else{

    let url = `https://test.api.amadeus.com/v1/travel/analytics/air-traffic/traveled?originCityCode=${cityIata}&period=${period}&max=10&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score`;

    axios.get(url).then(function (resp) {
        console.log(resp.statusCode);

    })



    // }

})

app.get('/historicflights', function(req,res){

    res.sendFile(__dirname + '/historicflights.html');
    req.body.fdate.value;

    let apiKey = '88c7b357f876240267c259da3ea84927';
    let url = `https://api.aviationstack.com/v1/flights
    ? access_key=${apiKey}&flight_date=${fDate}`;

    axios.get(url).then((result) => {
        console.log(result.data);

        function displayData() {

            let tempData = result.data.main.temp;
            let flTempData = result.data.main.feels_like;
            let pressure = result.data.main.pressure;
            let humidity = result.data.main.humidity;
            let showData = ` Temperature : ${tempData} \n Feels like ${flTempData} \n Pressure : ${pressure} \n Humidity : ${humidity} \n`;
            return showData;

        }

        res.send(`${displayData()}`);

    }).catch((err) => {
        console.log(err)
    });

})


app.listen(80, function () {
    console.log(`Server has been started , Listening on Port 80`);
});