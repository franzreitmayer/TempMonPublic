const express = require('express');

const data = new Array();


app = express();

// set the folder the views resides
app.set("views", "views");

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(express.json());

app.post('/api/sensor', (request, response) => {
    console.log('Got a request at /api/sensor');
    body = request.body;
    console.log(request.body);
    var to_log = request.body;
    to_log.timestamp = new Date();
    data.push(to_log);
    response.send('OK');

});

app.get('/api/sensor', (request, response) => {
    response.send(JSON.stringify(data));
});

app.use('/list', (request, response) => {
    var answer =
     "<html><head><title>List</title></head><body><h1><center>List</center></h1><table border='1'><tr><th>Timestamp</th><th>Sensor</th><th>Temperature</th><th>Humidity</th></tr>";
     data.forEach( item => {
         var line = "<tr><td>" + item.timestamp + "</td><td>" + item.sensor_id + "</td><td>" + item.temp + "</td><td>" + item.humidity + "</td></tr>";
         answer += line;
     });
     answer += "</table></body></html>"
     response.send(answer);
});

app.use('/', (req,res) => {
    res.render('index');
});

app.listen(9090);