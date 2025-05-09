const mysql = require('mysql2'); // Importer mysql2 pour la connexion à la base de données
const { get } = require('../routes/route');

const db = mysql.createConnection({
    host: 'localhost', port:3306,    // L'hôte de la base de données (souvent 'localhost' si en local)
    user: 'root',          // L'utilisateur MySQL (par défaut 'root' pour la majorité des installations locales)
    password: 'root',          // Le mot de passe MySQL (laissez vide si vous n'avez pas configuré de mot de passe)
    database: 'filrouge'  // Le nom de votre base de données
});


async function getUser(data) {
    var results = null;
    return new Promise((resolve, reject) => {
        if((data.email == "") || (data.password == "")){
            resolve(reject("error data not valid"));
        } else {
            email = data.email;
            password = data.password;
            type = data.type;

            query = "SELECT id FROM users WHERE Mail = ? AND Password = ?";
            db.query(query, [email,password], (error, results) => {
                if (error) {
                    resolve(reject(error));
                }
                resolve (results);
            });
        }

        return results;
       
    });
}

/**
 * 
 * @param {*} data  
 * @returns 
 */
async function setUser(data) {
    if ((data.email == "") || (data.password == "") || (data.type == "")) {
        throw new Error("error data not valid");
    } else {
        const existingUser = await getUser(data); // Attendre le résultat de getUser
        if (existingUser && existingUser.length > 0) {
            return { userexist: true };
        } else {
            const email = data.email;
            const password = data.password;
            const type = data.type;

            if (type == "register") {
                const query = "INSERT INTO users (Mail, Password) VALUES ( ?, ?)";
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        db.query(query, [email, password], (error, results) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(results);
                        });
                    }, 1000);
                    return { userCreate: true };
                });
            } else {
                throw new Error("error data not valid");
            }
        }
    }
}

module.exports =  { getUser,setUser } ;



