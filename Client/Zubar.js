export class Zubar{

    constructor(id, ime, prezime){
        this.id=id;
        this.ime=ime;
        this.prezime = prezime;
    }

    popuni(host){
        var op = document.createElement("option");
        op.innerHTML=this.ime+" "+" "+this.prezime;
        op.value=this.id;
        host.appendChild(op);
    }

}