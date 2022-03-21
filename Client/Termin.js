export class Termin{
    constructor(id,vreme){
        this.id = id;
        this.vreme = vreme;
    }

    popuni(host){
        var se = document.createElement("option");
        se.innerHTML=this.vreme;
        se.value=this.id;
        host.appendChild(se);
    }
}