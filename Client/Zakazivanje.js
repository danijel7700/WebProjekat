import { Usluga } from "./Usluga.js";
import { Termin } from "./Termin.js";



export class Zakazivanje{

  

    constructor(id,ime,prezime,vreme,tipUsluge,imeZubara,prezimeZubara,ordinacija,idZubara,vremeDT,korID){
        this.id=id;
        this.ime=ime;
        this.prezime=prezime;
        this.vreme=vreme;
        this.tipUsluge=tipUsluge;
        this.imeZubara=imeZubara;
        this.prezimeZubara=prezimeZubara;
        this.ordinacija=ordinacija;
        this.idZubara = idZubara;
        this.vremeDT = vremeDT;
        this.korID=korID;
    }

    crtaj(zakazanTerminDiv){


        var pomLab1 = document.createElement("label");
        pomLab1.innerHTML="Korisnik: "+this.ime+" "+this.prezime;
        pomLab1.className="zakazivanjeLab";
        zakazanTerminDiv.appendChild(pomLab1);

        var pomLab2 = document.createElement("label");
        pomLab2.innerHTML="Termin: "+this.vreme;
        pomLab2.className="zakazivanjeLab";
        zakazanTerminDiv.appendChild(pomLab2);

        var pomLab3 = document.createElement("label");
        pomLab3.innerHTML="Tip usluge: "+this.tipUsluge;
        pomLab3.className="zakazivanjeLab";
        zakazanTerminDiv.appendChild(pomLab3);

        var pomLab4 = document.createElement("label");
        pomLab4.innerHTML="Stomatolog: "+this.imeZubara+" "+this.prezimeZubara;
        pomLab4.className="zakazivanjeLab";
        zakazanTerminDiv.appendChild(pomLab4);

        var pomLab5 = document.createElement("label");
        pomLab5.innerHTML="Ordinacija: "+this.ordinacija;
        pomLab5.className="zakazivanjeLab";
        zakazanTerminDiv.appendChild(pomLab5);

        var btnIzmeniKorisnika=document.createElement("button");
        btnIzmeniKorisnika.onclick=(ev)=>this.izmeniZakazivanje(zakazanTerminDiv);
        btnIzmeniKorisnika.innerHTML="Izmeni";
        btnIzmeniKorisnika.classList="plava"
        zakazanTerminDiv.appendChild(btnIzmeniKorisnika);

        

        var btnObrisiKorisnika=document.createElement("button");
        btnObrisiKorisnika.onclick=(ev)=>this.obrisiZakazivanje(zakazanTerminDiv);
        btnObrisiKorisnika.innerHTML="Obriši";
        btnObrisiKorisnika.className="btnObrisiKorisnika";
        zakazanTerminDiv.appendChild(btnObrisiKorisnika);

    }

    izmeniZakazivanje(host){


        host.innerHTML="";
        
        var zameniZakazivanjeDiv = document.createElement("div");
        zameniZakazivanjeDiv.className="zameniZakazivanjeDiv";
        host.appendChild(zameniZakazivanjeDiv);

        var istoVremeDiv = document.createElement("div");
        istoVremeDiv.className="istoVremeDiv";
        host.appendChild(istoVremeDiv);

        var labistoVreme = document.createElement("labela");
        labistoVreme.innerHTML="Promeni vreme:";
        labistoVreme.className="labistoVreme";
        istoVremeDiv.appendChild(labistoVreme);
        
        var cbxIstoVreme=document.createElement("input");
        cbxIstoVreme.type="checkbox";
        istoVremeDiv.appendChild(cbxIstoVreme);

        

        cbxIstoVreme.onclick=(ev)=>{
            if(cbxIstoVreme.checked == true)
            {
                var terminDiv = document.createElement("div");
                terminDiv.classList="terminDiv";
                zameniZakazivanjeDiv.appendChild(terminDiv);

                var labTermin = document.createElement("labela");
                labTermin.innerHTML="Novi termin:";
                labTermin.className="labTermin";
                terminDiv.appendChild(labTermin);

                var selTermin = document.createElement("select");
                selTermin.className="selTermin";
                terminDiv.appendChild(selTermin);

                fetch("https://localhost:5001/Termin/VratiTermine/" + this.idZubara,
                {
                    method:"GET"
                }
                ).then(p =>{
                    if(p.ok){
                        p.json().then(data =>{
                            data.forEach(element =>{
                                var t = new Termin(element.id,element.vreme);
                                t.popuni(selTermin);
                            })
                        })
                    }
                        
                    })


            }
            else{
                var pom = host.querySelector(".terminDiv");
                zameniZakazivanjeDiv.removeChild(pom);
                
            }
        }
        

        var labUsluga = document.createElement("labela");
        labUsluga.innerHTML="Nova usluga:"
        labUsluga.className="labUsluga";
        zameniZakazivanjeDiv.appendChild(labUsluga);

        var selUsluga = document.createElement("select");
        selUsluga.className="selUsluga";
        zameniZakazivanjeDiv.appendChild(selUsluga);

        fetch("https://localhost:5001/Usluga/VratiUsluge/"+this.idZubara,
            {
                method:"GET"
            }).then(p =>{
                if(p.ok){
                    p.json().then(data =>
                        {
                            data.forEach(element =>{
                                var u = new Usluga(element.id,element.tip);
                                u.crtajIzmena(selUsluga);

                            })
                        })
                }
            })

        
        
        var btnOK = document.createElement("button");
        btnOK.className="btnOK";
        btnOK.innerHTML="OK";
        btnOK.onclick=(ev) =>{
            var selu = zameniZakazivanjeDiv.querySelector(".selUsluga");
            var uid = selu.options[selu.selectedIndex].value;

            if(cbxIstoVreme.checked == true)
            {
                var selt = zameniZakazivanjeDiv.querySelector(".selTermin");
                var tid = selt.options[selt.selectedIndex].value;
                this.izmeni(tid,uid,host);
            }else{

                fetch("https://localhost:5001/Termin/VratiTermin/" + this.vremeDT,
                {
                    method:"GET"
                }
                ).then(p =>{
                    if(p.ok){
                        p.json().then(data =>{
                            this.izmeni(data,uid,host);
                        })
                    }     
                    })

                    
                    
            }

            

            host.parentNode.parentNode.innerHTML="";

        }
        zameniZakazivanjeDiv.appendChild(btnOK);

        


        var btnNazad = document.createElement("button");
        btnNazad.className="plava";
        btnNazad.innerHTML="Vrati";
        btnNazad.onclick=(ev) =>{
            host.innerHTML="";
            this.crtaj(host);
        }
        zameniZakazivanjeDiv.appendChild(btnNazad);

    }

    

    izmeni(t,u,host){
        fetch("https://localhost:5001/Zakazivanje/IzmeniRezervisano/"+this.id+"/"+t+"/"+u+"/"+this.korID,
            {
                method:"PUT"
            }).then(p=>{
                if(p.ok){
                p.text().then(data=>{
                   alert(data);
                    
                })
            }
            else{
                p.text().then(data =>{
                    alert(data);
                })
            }
            })

     
            
    }

    obrisiZakazivanje(host){

        
        
        fetch("https://localhost:5001/Zakazivanje/IzbrisiZakazano/"+this.id,
        {
            method:"DELETE"
        }).then(p=>{
            if(p.ok){
                p.text().then(data =>{
                    alert(data);
                    var roditelj = host.parentNode;
                    roditelj.removeChild(host);

                    if(roditelj.innerHTML === null || roditelj.innerHTML === undefined || roditelj.innerHTML === "")
                    {
                        roditelj.parentNode.innerHTML="";
                    }
                })
            }
            else{
                p.text().then(data =>{
                    alert(data);
                })
            }
        })

        

    }
}