// Acá lo que se hizo fue hacer una peticion a una API por medio de callbacks y asi tener la informacion
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/'; // Aca guaramos el API que vamos a usar para realizar nuestras peticiones

function fetchData(url_api, callback) { // Aca creamos la funcion y le ponemos los dos parametros principales, el la API que te enmos guardada en una variable y nuestro callback con el que haremos las peticiones
    let xhttp = new XMLHttpRequest(); // En esta parte crearemos nuestra funcion local para comenzar a hacer nuestras peticiones, y usamos la herramienta new para podes usar el XMLHttpRequest 
    xhttp.open('GET', url_api, true); // Con el .open ya empezamos a hacer la primer peticion, entonces se le agregaron 3 parametros, el GET que es la palabra clave para hacer la peticion,  la variable donde tenemos guardada nuestra API y un booleano, en este caso es true
    xhttp.onreadystatechange = function (event) {
        if (xhttp.readyState === 4) { // Usamos este if para que filtrar la respuesta de nustra peticion, y si nos devuelve lo que necesitamos se siga ejecutando nuestro codigo
            if (xhttp.status === 200) { // ponemoseste otro if para ser aun mas estrictos con la respuesta a nuestra peticion y de ahi seguir con la informacion que estamos pidiendo
                callback(null, JSON.parse(xhttp.responseText))
            } else {
                const error = new Error('Error' + url_api); // Como vimos en caso de que en la peticion que hicimos no nos regrese nada o no lo que queriamos, se ejecutará esta parte del codigo el cual nos avisara que hubo un erro con nuestra peticion y no se seguirá ejecutando
                return callback(error, null);
            }
        }
    }
    xhttp.send(); // Ya si lo que nos regrese de nuestra peticion cumple con lo que necesitamos, nos la mandara para poder acceder a la informacion que deseemos usar
fetchData(API, function (error1, data1) { // Acá yaa creamos la funcion como tal donde se verá el procedimiento por el cual pasará la informacion que pedimos de la API
    if (error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function(error2, data2) {
        if(error2) return console.error(error2);
        fetchData(data2.origin.url, function(error3, data3) {
            if(error3) console.error(error3)
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        });
    })
})}