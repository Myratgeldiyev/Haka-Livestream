
import dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();


const db = mysql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   port: process.env.DB_PORT || 3306,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
 });

 await db.getConnection( (err, connection) => {
     
    if(err)
    {
        console.error("errror connecting to the database" + err);
        return;
    }

    console.log("connected successfully");
    connection.release();
 } );

 export default db;