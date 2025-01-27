const mysql = require('mysql2'); // Importer mysql2 pour la connexion à la base de données
const { get } = require('../routes/route');

const db = mysql.createConnection({
    host: 'localhost', port:3306,    // L'hôte de la base de données (souvent 'localhost' si en local)
    user: 'root',          // L'utilisateur MySQL (par défaut 'root' pour la majorité des installations locales)
    password: 'root',          // Le mot de passe MySQL (laissez vide si vous n'avez pas configuré de mot de passe)
    database: 'filrouge'  // Le nom de votre base de données
});


async function getArticles(type,limit,orderby) {

    let categorie = null;

    if (type !== null) {
        categorie = await getCategorie(type);
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            query = 'SELECT * FROM articles';
            if (type !== null) {
                query += ` WHERE Catégorie = '${categorie}'`;
            }
            if (orderby !== null) {
                query += ` ORDER BY id ${orderby}`;
            }
            if (limit !== null) {
                query += ` LIMIT ${limit}`;
            }
            db.query(query, (error, results) => {
                if (error) {
                    resolve(reject(error));
                } else {
                    resolve(results);
                }
            });

        }, 1000);
    });
}

function getCategorie(type){
    query = 'SELECT id FROM categorie WHERE nom = ?';
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.query(query, [type], (error, results) => {
                if (error) {
                    console.error(error);
                    resolve(reject(error));
                }
                resolve (results[0].id);
            });
        }, 1000);
    })
}

function setArticle(data){
    query = "INSERT INTO users (Title, Picture,Homepage, Tag, Catégorie) VALUES ( ?,?,?,?,?)";
    setTimeout(() => {
        catExist = getCategorie(data.Catégorie);
        if (catExist === null){
            catExist = setCategorie(data.Catégorie);
        }
        db.query(query, [data.Title,data.Picture,data.Homepage,data.Tag,catExist], (error, results) => {
            if (error) {
                resolve(reject(error));
            }
            console.log(results)
            resolve (results);
        });
    }, 1000);
}

function setCategorie(data){
    query = "INSERT INTO categorie (nom) VALUES ( ?)";
    setTimeout(() => {
        db.query(query, [data], (error, results) => {
            if (error) {
                resolve(reject(error));
            }
            console.log(results)
            resolve (results);
        });
    }, 1000);
}

module.exports =  { getArticles, setArticle } ;
