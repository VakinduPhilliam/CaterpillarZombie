//Import all required modules
const express =require('express');
const path =require('path');
const fetch = require('node-fetch'); // Data fetch feature;
const {writeData, readData} = require('./helpers/save')
const {isNumber} = require('./helpers/helper')

// Initialize express app
const app = express();

const port = 6700; // connection port

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse form data client
app.use(express.static(path.join(__dirname, '/'))); // configure express to use public folder

// Route for loading the front page.
app.get('/', async (req, res) => {

    let response = await fetch('https://api.bitbucket.org/2.0/repositories/vakindu/caterpillarzombie/pullrequests', { // Fetch bitbucket project repository pull requests
        method: 'GET',
        headers: {
            'Authorization': 'Bearer BetHAqSUH7xvvYGropBq',
            'Accept': 'application/json'
        }
    });

    let jsonBody = await response.text(); // fetched data in raw form

    let objectBody = JSON.parse(jsonBody); // fetched data in object form

    //console.log(objectBody.values.length); // Print number of pull requests

    // Check if file has reached its storage size limit        
    if(response.status==200 && objectBody.values.length>4){
        
        // Store new data            
        let new_game_engine_data = {number_of_issues:objectBody.values.length};

        writeData('/docs/', 'log.json', new_game_engine_data);

    }

    // Read data from file        
    let dataRead = readData('/docs/', 'log.json');

    // Parse data to JSON                    
    let convertData = JSON.parse(dataRead);

    let issues = convertData.number_of_issues; // Find number of issues // Default is 3 issues

    let caterpillar_game_length=parseFloat(`0.${issues}`); // Recalculate length of new zombie caterpillar

    res.render('index.ejs', {
        caterpillar_length: caterpillar_game_length,
        title: " ",
        message: ''
    });
}); 

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

