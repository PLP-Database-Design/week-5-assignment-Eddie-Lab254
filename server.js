const express = require ('express');
const app = express ();
const mysql = require ('mysql2');
const dotenv = require ('dotenv');
const cors = require ('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) =>{ 
    if (err) return console.log('Error connecting to the db', err);
    console.log('Connection successfully as id: ' , db.threadId)
   
   1. //Retrieve all patients
   app.get('/patients' , (req, res) =>{
    const sql =  "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
    db.query(sql, (err,results) =>{
        if(err){
            return res.status(500).send('Failed to fetch the patients')
        }
        res.status(200).send(results)
    })
   }) 

    2.//Retrieve all providers
    app.get('/providers' , (req, res) =>{
            const sql = "SELECT first_name, last_name, provider_specialty FROM providers";
        db.query(sql, (err,results) =>{
            if(err){
                return res.status(500).send('Failed to fetch the providers')
            }
            res.status(200).send(results)
        })
       }) 
      

   3.//filter patients by First Name
app.get('/patients/first-name/:firstName' ,(req, res) => {
    const firstName = req.params.firstName;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?'; 

    db.query(query, [ firstName], (err,results) => {
        if (err) {
            return res.status(500).send('error fetching first_name')
        }
        res.status(200).send(results);
    })
})

4.// Retrieve all providers by their specialty
app.get('/providers/provider-specialty/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    
    db.query(query, [specialty], (err, results) => {
      if (err) {
        return res.status(500).send( 'error');
      }
      res.send(results);
    });
  });




    app.listen(process.env.PORT,() =>{
        console.log(`server listening on port ${process.env.PORT}`);

        //send a message to browser
        console.log('sending message to browser...');
        app.get('/', (req,res) =>{
            res.send('server started successfully');
        });
    });
});