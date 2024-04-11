const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Anslut till min databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});
//Ansluter till databas
client.connect((err) => {
    if(err) {
        console.log("Fel vid anslutning" + err);
    } else {
        console.log("Ansluten till databasen...");
    }
});

//Routes för metoder
app.get("/api", (req, res) => {
    res.json({message: "Welcome to the workexperience api made by Johan Magnusson"});
});

app.get("/api/workexperience", (req, res) => {

    //Get request
    client.query(`SELECT * FROM moment2_workexperience`, (err, results) => {
        if(err) {
            res.status(500).json({error: "Something went wrong : " + err});
            return;
        } 

    if(!results ||results.rows.length ===0) {
        res.status(404).json({message: "No work experience found"});
    } else {
        res.json(results.rows);
    }
    })
});
//Post request
app.post("/api/workexperience", (req, res) => {
    let companyName = req.body.companyname;
    let jobTitle = req.body.jobtitle;
    let location = req.body.location;

    //Fel hanterare
    let errors = {
        message: "",
        details: "",
        https_response: {

        }
    };
    //IFall inte companyname, jobtitle eller location finns
    if(!companyName || !jobTitle || !location) {
    //Felmeddelande
    errors.message = "Company name, job title and location not included"
    errors.details = "Fill in company name, job title, and location"

    //Response kod
    errors.https_response.message = "Bad request";
    errors.https_response.code = 400;

    res.status(400).json(errors);

        return;
    }

    //Lägg till erfarenhet till databasen med sql fråga
    client.query(`INSERT INTO moment2_workexperience(companyname, jobtitle, location) VALUES($1, $2, $3);`, [companyName, jobTitle, location], (err, results) => {
        if(err) {
            res.status(500).json({error: "Something went wrong : " + err});
            return;
        } 

        console.log("Fråga skapad: " + results);

        let workExperience = {
            companyName: companyName,
            jobTitle: jobTitle,
            location: location
        };
    
        res.json({message: "Workexperience added:", workExperience});

    });

});

app.put("/api/workexperience/:id", (req, res) => {
    const id = req.params.id;
    const { companyname, jobtitle, location } = req.body;

    // Uppdatera arbetslivserfarenhet i databasen med sqlfråga
    client.query(
        `UPDATE moment2_workexperience 
         SET companyname = $1, jobtitle = $2, location = $3 
         WHERE id = $4`,
        [companyname, jobtitle, location, id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Something went wrong: " + err });
                return;
            }
            res.json({ message: `Workexperience with id ${id} updated` });
        }
    );
});
//Delete request 
app.delete("/api/workexperience/:id", (req, res) => {
    const id = req.params.id;

    // Ta bort arbetslivserfarenhet från databasen med sqlfråga
    client.query(
        `DELETE FROM moment2_workexperience WHERE id = $1`,
        [id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Something went wrong: " + err });
                return;
            }
            res.json({ message: `Workexperience with id ${id} deleted` });
        }
    );
});



app.listen(port, () => {
    console.log("server is running on port: " + port);
});