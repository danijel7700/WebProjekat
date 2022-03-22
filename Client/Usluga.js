export class Usluga{

    constructor(id,tip,cena){
        this.id=id;
        this.tip=tip;
        this.cena=cena;
    }

    crtaj(host){
        var rbUsluga = document.createElement("input");
        rbUsluga.type="radio";
        rbUsluga.name="usluga";
        rbUsluga.value=this.id;

        

        rbUsluga.onclick=(ev)=>{
            var d = host.parentNode.parentNode;
            var staraCena = d.querySelector(".cenaLab");
            if(staraCena != null){
                d.removeChild(staraCena);
            }
            var c = document.createElement("label");
            c.innerHTML="Cena: "+this.cena+" din";
            c.className="cenaLab";
            d.appendChild(c);
        }


        host.appendChild(rbUsluga);

        var labUsluga = document.createElement("label");
        labUsluga.className="labUsluga";
        labUsluga.innerHTML=this.tip;
        host.appendChild(labUsluga);
    }

    crtajIzmena(host){
        var op = document.createElement("option");
        op.innerHTML=this.tip;
        op.value=this.id;
        host.appendChild(op);
    }

}