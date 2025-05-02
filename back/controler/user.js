const mysql = require('mysql2'); // Importer mysql2 pour la connexion à la base de données
const { get } = require('../routes/route');

const db = mysql.createConnection({
    host: 'localhost', port:3306,    // L'hôte de la base de données (souvent 'localhost' si en local)
    user: 'root',          // L'utilisateur MySQL (par défaut 'root' pour la majorité des installations locales)
    password: 'root',          // Le mot de passe MySQL (laissez vide si vous n'avez pas configuré de mot de passe)
    database: 'filrouge'  // Le nom de votre base de données
});


async function getUser(data) {
    return new Promise((resolve, reject) => {
        if((data.username == "") || (data.password == "") || (data.type == "")){
            resolve(reject("error data not valid"));
        } else {
            username = data.username;
            password = data.password;
            type = data.type;

            if(type == "login"){
                query = "SELECT id FROM users WHERE Name = ? AND Password = ?";
                setTimeout(() => {
                    db.query(query, [username,password], (error, results) => {
                        if (error) {
                            resolve(reject(error));
                        }
                        console.log(results)
                        resolve (results);
                    });
                }, 1000);
            } else {
                resolve(reject("error data not valid"));
            }
        }
    });
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
async function setUser(data) {
    return new Promise((resolve, reject) => {
        if((data.username == "") || (data.password == "") || (data.type == "")){
            resolve(reject("error data not valid"));
        } else {
            if(getUser(data)){
                resolve(reject("error user déjà existant"));
            } else {
                username = data.username;
                password = data.password;
                type = data.type;
    
                if(type == "register"){
                    query = "INSERT INTO users (Name, Password) VALUES ( ?, ?)";
                    setTimeout(() => {
                        db.query(query, [username,password], (error, results) => {
                            if (error) {
                                resolve(reject(error));
                            }
                            console.log(results)
                            resolve (results);
                        });
                    }, 1000);
                } else {
                    resolve(reject("error data not valid"));
                }
            }
           
        }
    });
}

module.exports =  { getUser,setUser } ;



