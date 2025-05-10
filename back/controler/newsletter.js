const mysql = require('mysql2'); // Importer mysql2 pour la connexion à la base de données
const { get } = require('../routes/route');

const db = mysql.createConnection({
    host: 'localhost', port:3306,    // L'hôte de la base de données (souvent 'localhost' si en local)
    user: 'root',          // L'utilisateur MySQL (par défaut 'root' pour la majorité des installations locales)
    password: 'root',          // Le mot de passe MySQL (laissez vide si vous n'avez pas configuré de mot de passe)
    database: 'filrouge'  // Le nom de votre base de données
});


async function setUserNewsletter(data){
    console.log("setUserNewsletter : ", data);
    query = "INSERT INTO newsletter (Mail) VALUES ( ?)";
    setTimeout(() => {
        db.query(query, [data], (error, results) => {
            if (error) {
                resolve(reject(error));
            }
            resolve (results);
        });
    }, 1000);
}

module.exports =   { setUserNewsletter };
