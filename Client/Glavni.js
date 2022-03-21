import { Zubar } from "./Zubar.js";
import { Usluga } from "./Usluga.js";
import { Korisnik } from "./Korisnik.js";
import { Zakazivanje } from "./Zakazivanje.js";
import { Termin } from "./Termin.js";

var korisnikID;
var korisnikEmail;

export class Glavni{

    constructor(listaOrdinaicja){
        this.listaOrdinaicja = listaOrdinaicja;
        this.kont = null;
    }

    

    crtaj(host){

        this.kont = document.createElement("div");
        this.kont.className = "GlavniKont";
        host.appendChild(this.kont);

        var naslovDiv = document.createElement("div");
        naslovDiv.className = "naslovDiv";
        this.kont.appendChild(naslovDiv);

        let logo = document.createElement("img");
        logo.src="logo.png";
        logo.className="logo";
        logo.onclick=(ev) =>
        {
            if(formaDiv.innerHTML === "")
            {
                var pocetniDiv = document.createElement("div");
                pocetniDiv.className = "pocetniDiv";
                formaDiv.appendChild(pocetniDiv);

                var l = document.createElement("label");
                l.className="OrdLab"
                l.innerHTML="Ordinacija:";
                pocetniDiv.appendChild(l);

                var se = document.createElement("select");
                se.className="OrdSel"
                pocetniDiv.appendChild(se);

                var op;
                this.listaOrdinaicja.forEach(element => {
                    op = document.createElement("option");
                    op.innerHTML=element.naziv;
                    op.value=element.id;
                    se.appendChild(op);
                });


                var adresaDiv = document.createElement("div");
                adresaDiv.className="adresaDiv";
                pocetniDiv.appendChild(adresaDiv);

                let btnIzaberiOrdinaciju = document.createElement("button");
                btnIzaberiOrdinaciju.onclick=(ev)=>this.ordinacijaInfo(adresaDiv, ordinacijaDiv);
                btnIzaberiOrdinaciju.className = "plava";
                btnIzaberiOrdinaciju.innerHTML = "Izaberi"
                pocetniDiv.appendChild(btnIzaberiOrdinaciju); 

                var ordinacijaDiv = document.createElement("div");
                ordinacijaDiv.className = "ordinacijaDiv";
                pocetniDiv.appendChild(ordinacijaDiv);
            }
            else formaDiv.innerHTML="";

        }
        naslovDiv.appendChild(logo);

        

        var prijavljenDiv = document.createElement("div");
        prijavljenDiv.className="prijavljenDiv";
        naslovDiv.appendChild(prijavljenDiv);

        let slika = document.createElement("img");
        slika.src="user.png";
        slika.className="slika";
        slika.onclick=(ev) => this.prijaviSe(korisnikDiv);
        prijavljenDiv.appendChild(slika);

        let prijavljenLab = document.createElement("label");
        prijavljenLab.innerHTML="";
        prijavljenLab.className="prijavljenLab";
        prijavljenDiv.appendChild(prijavljenLab);

        var korisnikDiv = document.createElement("div");
        korisnikDiv.className = "korisnikDiv";
        this.kont.appendChild(korisnikDiv);

        var formaDiv = document.createElement("div");
        formaDiv.className = "formaDiv";
        this.kont.appendChild(formaDiv);

    }

    ordinacijaInfo(adresaDiv, ordinacijaDiv){

        adresaDiv.innerHTML="";
        ordinacijaDiv.innerHTML="";

        var optionEl = this.kont.querySelector("select");
        var ord = optionEl.options[optionEl.selectedIndex].value;

        this.listaOrdinaicja.forEach(p =>
            {
                if(p.id == ord)
                {
                    var adresaLab = document.createElement("label");
                    adresaLab.className="adresaLab";
                    adresaLab.innerHTML="Adresa: " + p.adresa;
                    adresaDiv.appendChild(adresaLab);
                }
            })

            var lab = document.createElement("label");
            lab.className="izaberiZubara";
            lab.innerHTML="Izaberi stomatologa:"
            ordinacijaDiv.appendChild(lab);

            var izDiv = document.createElement("div");
            izDiv.className="izDiv";
            ordinacijaDiv.appendChild(izDiv);

            var selZubari = document.createElement("select");
            selZubari.className="selZubari";
            izDiv.appendChild(selZubari);

            fetch("https://localhost:5001/Zubar/VratiZubare/"+ord,
            {
                method:"GET"
            }).then(p =>
                {
                    if(p.ok){
                        p.json().then(data =>{
                            data.forEach(element => {
                                var z = new Zubar(element.id,element.ime,element.prezime); 
                                z.popuni(selZubari);
                                });
                            })
                        }
                    }
                )
            

            var zubarDiv = document.createElement("div");
            zubarDiv.className="zubarDiv";
            ordinacijaDiv.appendChild(zubarDiv);

            var btnZubar = document.createElement("button");
            btnZubar.onclick=(ev)=>this.zubarInfo(zubarDiv,ordinacijaDiv);
            btnZubar.className="plava";
            btnZubar.innerHTML="Izaberi";
            izDiv.appendChild(btnZubar);
        
    }

    zubarInfo(zubarDiv,ordinacijaDiv){


        zubarDiv.innerHTML="";

        var uslugaLab = document.createElement("label");
        uslugaLab.innerHTML="Izaberi tip usluge: ";
        zubarDiv.appendChild(uslugaLab);


        var uslugeDiv = document.createElement("div");
        uslugeDiv.className="uslugeDiv";
        zubarDiv.appendChild(uslugeDiv);

        var optionEl = ordinacijaDiv.querySelector("select");
        var idZubara = optionEl.options[optionEl.selectedIndex].value;

        

        fetch("https://localhost:5001/Usluga/VratiUsluge/"+idZubara,
            {
                method:"GET"
            }).then(p =>{
                if(p.ok){
                    p.json().then(data =>
                        {
                            data.forEach(element =>{
                                var u = new Usluga(element.id,element.tip);
                                var uDiv = document.createElement("div");
                                uDiv.className="uDiv";
                                uslugeDiv.appendChild(uDiv);
                                u.crtaj(uDiv);

                            })
                        })
                }
            })

            var vremeDiv = document.createElement("div");
            vremeDiv.className="vremeDiv";
            zubarDiv.appendChild(vremeDiv);

            var vremeLab = document.createElement("label");
            vremeLab.innerHTML="Izaberi vreme termina: ";
            vremeDiv.appendChild(vremeLab);
            
            var terminSel = document.createElement("select");
            terminSel.className="terminSel";
            vremeDiv.appendChild(terminSel);

            fetch("https://localhost:5001/Termin/VratiTermine/" + idZubara,
            {
                method:"GET"
            }
            ).then(p =>{
                if(p.ok){
                    p.json().then(data =>{
                        data.forEach(element =>{
                            var t = new Termin(element.id,element.vreme);
                            t.popuni(terminSel);
                        })
                    })
                }
                    
                })

            var btnZakazi = document.createElement("button");
            btnZakazi.innerHTML="Zakaži termin";
            btnZakazi.className="btnZakazi";
            btnZakazi.onclick=(ev)=>this.zakaziTermin();
            zubarDiv.appendChild(btnZakazi);
            
    }

    zakaziTermin(){
        var zs = this.kont.querySelector(".selZubari");
        var z = zs.options[zs.selectedIndex].value;
        
        var ur = this.kont.querySelector("input[type='radio']:checked");
        if(ur === null)
        {
            alert("Morate izabrati uslugu!");
            return;
        }

        var ts = this.kont.querySelector(".terminSel");
        var t = ts.options[ts.selectedIndex].value;

        var kd = this.kont.querySelector(".korisnikDiv");
        if(korisnikID === undefined){
            alert("Morate se prvo prijaviti ili registrovati!");
            this.prijaviSe(kd);
            return;
        }
        
        fetch("https://localhost:5001/Zakazivanje/DodajZakazivanje/"+z+"/"+t+"/"+ur.value+"/"+korisnikID,
        {
            method:"POST"
        }).then(p =>{
            if(p.ok){
                alert("Uspešno ste zakazali termin!");
                
            }else{
                p.text().then(data=>{
                    alert(data);
                })
            }
        })

        var pom = this.kont.querySelector(".formaDiv");
        pom.innerHTML="";
        
    }

    

    prijaviSe(korisnikDiv){
        

        if(korisnikDiv.innerHTML === "")
        {
            var korisnikDivLevi = document.createElement("div");
            korisnikDivLevi.className = "korisnikDivLevi";
            korisnikDiv.appendChild(korisnikDivLevi);
            
            var korisnikDivDesni = document.createElement("div");
            korisnikDivDesni.className = "korisnikDivDesni";
            korisnikDiv.appendChild(korisnikDivDesni);
            

            var labEmail = document.createElement("label");
            labEmail.innerHTML="Unesi mejl adresu: ";
            korisnikDivLevi.appendChild(labEmail);

            var unesiEmail = document.createElement("input");
            unesiEmail.type="text";
            unesiEmail.className="unesiEmail";
            if(korisnikEmail != null && korisnikEmail != undefined && korisnikEmail != "")
                unesiEmail.value=korisnikEmail;
            korisnikDivLevi.appendChild(unesiEmail);

            var labRegistracija = document.createElement("label");
            labRegistracija.innerHTML="Unesi novog korisnika!";
            labRegistracija.className="registracija"
            labRegistracija.onclick=(ev) => {
                korisnikDivDesni.innerHTML="";
                korisnikDivLevi.innerHTML="";

                var niz = ["Ime: ","Prezime: ","Email: "];

                niz.forEach(el =>
                    {
                        var labUnos = document.createElement("label");
                        labUnos.innerHTML=el;
                        korisnikDivLevi.appendChild(labUnos);

                        var textUnos = document.createElement("input");
                        textUnos.type="text";
                        korisnikDivLevi.appendChild(textUnos);
                    })
                    

                var btnUnesi = document.createElement("button");
                btnUnesi.onclick=(ev)=>this.unesiKorisnika(korisnikDivLevi);
                btnUnesi.className="btnUnesi";
                btnUnesi.innerHTML="Unesi";
                korisnikDivLevi.appendChild(btnUnesi);

                var btnVrati = document.createElement("button");
                btnVrati.onclick=(ev)=>{
                    korisnikDiv.innerHTML="";
                    this.prijaviSe(korisnikDiv);
                }
                btnVrati.className="plava";
                btnVrati.innerHTML="Nazad";
                korisnikDivLevi.appendChild(btnVrati);


            }

            korisnikDivLevi.appendChild(labRegistracija);

            var btnOK = document.createElement("button");
            btnOK.innerHTML="OK";
            btnOK.onclick=(ev) => {
                if(unesiEmail.value === null || unesiEmail.value === undefined || unesiEmail.value === "")
                {
                    alert("Morate uneti email adresu!");
                }
                else
                {
                    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                    if(!unesiEmail.value.match(mailFormat)){
                        alert("Nevalidan unos email adrese!");
                        return;
                    }



                   
                    fetch("https://localhost:5001/Korisnik/VratiKorisnika/" + unesiEmail.value,
                    {
                        method:"GET"
                    }).then(p =>{
                        if(p.ok){
                            p.json().then(data =>{
                                data.forEach(element =>{
                                    korisnikID = element.id;
                                    korisnikEmail = element.email;
                                    var poz = this.kont.querySelector(".prijavljenDiv")
                                    var l = poz.querySelector(".prijavljenLab");
                                    l.innerHTML="Korisnik: "+element.ime+" "+element.prezime;
                                    korisnikDiv.innerHTML="";
                                })
                            })
                        }
                        else{
                            p.text().then(data=>{
                                alert(data);
                            })
                        }
                    })

                    
                }
            }
            korisnikDivLevi.appendChild(btnOK);

            var btnZakazivanja = document.createElement("button");
            btnZakazivanja.innerHTML="Prikaži sva zakazivanja korisnika";
            btnZakazivanja.className="plava";
            btnZakazivanja.onclick=(ev) => {
                korisnikDivDesni.innerHTML="";

                var korisnikDivDesniNazad = document.createElement("div");
                korisnikDivDesniNazad.className = "korisnikDivDesniNazad";
                korisnikDivDesni.appendChild(korisnikDivDesniNazad);

                var korisnikDivDesniPrikazi = document.createElement("div");
                korisnikDivDesniPrikazi.className = "korisnikDivDesniPrikazi";
                korisnikDivDesni.appendChild(korisnikDivDesniPrikazi);

                if(unesiEmail.value === null || unesiEmail.value === undefined || unesiEmail.value === ""){
                    alert("Morate uneti email adresu!");
                    return;
                }

                var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if(!unesiEmail.value.match(mailFormat)){
                    alert("Nevalidan unos email adrese!");
                    return;
                }
                
                fetch("https://localhost:5001/Zakazivanje/VratiZakazivanje/"+unesiEmail.value,
                {
                    method:"GET"
                }).then(p =>{
                    if(p.ok){
                        
                        p.json().then(data =>{
                            if(data.length != 0)
                            {
                                var x = document.createElement("img");
                                x.src="x.png"
                                x.className="x";
                                x.onclick=(ev)=>{
                                    korisnikDivDesni.innerHTML="";
                                }
                                korisnikDivDesniNazad.appendChild(x);
                            }   
                            data.forEach(element =>{
                                var z = new Zakazivanje(element.id,element.ime,element.prezime,element.vreme,element.tipUsluge,element.imeZubara,element.prezimeZubara,element.ordinacija,element.idZubara,element.vremeDT,element.korID);
                                var zakazanTerminDiv = document.createElement("div");
                                zakazanTerminDiv.className="zakazanTerminDiv";
                                korisnikDivDesniPrikazi.appendChild(zakazanTerminDiv);
                                z.crtaj(zakazanTerminDiv);
                            })
                        })
                    }
                    else{
                        p.text().then(data=>{
                            alert(data);
                        })
                    }
                })
            }
            korisnikDivLevi.appendChild(btnZakazivanja);

            var btnIzmeniKorisnika = document.createElement("button");
            btnIzmeniKorisnika.innerHTML="Izmeni podatke o korisniku";
            btnIzmeniKorisnika.className="plava";
            btnIzmeniKorisnika.onclick=(ev) => this.izmeniKorisnika(korisnikDivDesni,unesiEmail.value);
            korisnikDivLevi.appendChild(btnIzmeniKorisnika);
        }
        else korisnikDiv.innerHTML="";
    }


    unesiKorisnika(korisnikDivLevi){

        
        var pom = korisnikDivLevi.querySelectorAll("input[type='text']");
        if(pom[0].value === null || pom[0].value === undefined || pom[0].value === ""
            && pom[1].value === null || pom[1].value === undefined || pom[1].value === ""
            && pom[2].value === null || pom[2].value === undefined || pom[2].value === "")
        {
            alert("Sva polja moraju biti popunjena!");
            return;
        }

        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!pom[2].value.match(mailFormat)){
            alert("Nevalidan unos email adrese!");
            return;
        }
        
        
        fetch("https://localhost:5001/Korisnik/DodajKorisnika/"+pom[0].value+"/"+pom[1].value+"/"+pom[2].value,
        {
            method:"POST"
        }).then(p =>{
            if(p.ok){
                p.json().then(data =>{
                        korisnikID = data.id;
                        korisnikEmail = data.email;
                        var kor = document.createElement("label");
                        kor.innerHTML="Korisnik: "+data.ime+" "+data.prezime;
                        var poz = this.kont.querySelector(".prijavljenDiv")
                        poz.appendChild(kor);
                        var rod = korisnikDivLevi.parentNode;
                        rod.removeChild(korisnikDivLevi);
                        alert("Korisnik je uspešno registrovan");    
                })
            }else{
                p.text().then(data =>{
                    alert("Neuspesan unos!"+data);
                })
            }

        })

        
        
    }

    izmeniKorisnika(korisnikDivDesni,mejl){

        korisnikDivDesni.innerHTML="";

        var txt = korisnikDivDesni.parentNode.querySelector(".unesiEmail");

        if(mejl === null || mejl === undefined || mejl === ""){
            alert("Morate uneti email adresu!");
            return;
        }

        var korisnikDivDesniIzmeni = document.createElement("div");
        korisnikDivDesniIzmeni.className = "korisnikDivDesniIzmeni";
        korisnikDivDesni.appendChild(korisnikDivDesniIzmeni);

        fetch("https://localhost:5001/Korisnik/VratiKorisnika/" + mejl,
                    {
                        method:"GET"
                    }).then(p =>{
                        if(p.ok){
                            p.json().then(data =>{
                                data.forEach(element =>{
                                    korisnikID = element.id;
                                    var niz = ["Ime: ","Prezime: ","Email: "];
                                    var niz2 = [element.ime,element.prezime,element.email];
                                    niz.forEach((el,j) =>
                                        {
                                            var labUnos = document.createElement("label");
                                            labUnos.innerHTML=el;
                                            korisnikDivDesniIzmeni.appendChild(labUnos);
                    
                                            var textUnos = document.createElement("input");
                                            textUnos.type="text";
                                            textUnos.value=niz2[j];
                                            korisnikDivDesniIzmeni.appendChild(textUnos);
                                        })
                                    var btnIzmeni = document.createElement("button");
                                    btnIzmeni.innerHTML="Izmeni";
                                    btnIzmeni.onclick=(ev)=>{
                                        var pom = korisnikDivDesniIzmeni.querySelectorAll("input[type='text']");
                                        if(pom[0].value === null || pom[0].value === undefined || pom[0].value === ""
                                            && pom[1].value === null || pom[1].value === undefined || pom[1].value === ""
                                            && pom[2].value === null || pom[2].value === undefined || pom[2].value === "")
                                        {
                                            alert("Sva polja moraju biti popunjena!");
                                            return;
                                        }

                                        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                                        if(!pom[2].value.match(mailFormat)){
                                            alert("Nevalidan unos email adrese!");
                                            return;
                                        }

                                        var kor = new Korisnik(element.id,pom[0].value,pom[1].value,pom[2].value);
                                        
                                        fetch("https://localhost:5001/Korisnik/PromeniKorisnika",
                                        {
                                            method:"PUT",
                                            headers:{
                                                "Content-Type":"application/json"
                                            },
                                            body:JSON.stringify(kor)
                                        }).then(p=>{
                                            p.text().then(data =>{
                                                txt.value=pom[2].value;
                                                alert(data);
                                            })

                                        })

                                        var q = this.kont.querySelector(".prijavljenDiv");
                                        var l = q.querySelector(".prijavljenLab");
                                        l.innerHTML="Korisnik: "+pom[0].value+" "+pom[1].value;


                                    }
                                    korisnikDivDesniIzmeni.appendChild(btnIzmeni);

                                    var btnNazad = document.createElement("button");
                                    btnNazad.innerHTML="Nazad";
                                    btnNazad.className="btnNazad";
                                    btnNazad.onclick=(ev)=>{
                                        korisnikDivDesni.innerHTML="";
                                    }
                                    korisnikDivDesniIzmeni.appendChild(btnNazad);
                                })
                            })
                        }
                        else{
                            p.text().then(data=>{
                                alert(data);
                            })
                        }
                    })
    }
}
