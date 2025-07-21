import mysql from 'mysql2';

// connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blogs_app'
});

db.connect((error) => {
    if (error)
        return console.log(`Error in Conect To dataBase`) // هنا ممكن يكون فيه مشكلة
    else
        return console.log("connection database succssfully");
})

export default db;