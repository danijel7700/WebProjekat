export class Usluga{

    constructor(id,tip){
        this.id=id;
        this.tip=tip;
    }

    crtaj(host){
        var rbUsluga = document.createElement("input");
        rbUsluga.type="radio";
        rbUsluga.name="usluga";
        rbUsluga.value=this.id;
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