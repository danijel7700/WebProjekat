import { Glavni } from "./Glavni.js";
import { Ordinacija } from "./Ordinacija.js";

var listaOrdinacija = [];

fetch("https://localhost:5001/Ordincaija/VratiOrdinacije")
    .then(p =>
        {
            p.json().then(data =>{
                data.forEach(element => {
                    
                    var o = new Ordinacija(element.id, element.naziv, element.adresa);
                    listaOrdinacija.push(o);

                });
                var or = new Glavni(listaOrdinacija);
                or.crtaj(document.body);
            })
        })





