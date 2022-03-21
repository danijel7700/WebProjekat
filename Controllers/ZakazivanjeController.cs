using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace WebProjekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ZakazivanjeController : ControllerBase
    {
        public OrdinacijaContext Context { get; set; }

        public ZakazivanjeController(OrdinacijaContext context)
        {
            Context = context;
        }

        [Route("DodajZakazivanje/{idZubara}/{idTermina}/{idUsluge}/{idKorisnika}")]
        [HttpPost]
        public async Task<ActionResult> DodajZakazivanje(int idZubara,int idTermina,int idUsluge,int idKorisnika)
        {
            if(idZubara <= 0)
            {
                return BadRequest("Nevalidan ID zubara!");
            }

            if(idTermina <= 0)
            {
                return BadRequest("Nevalidan ID termina!");
            }

            if(idUsluge <= 0)
            {
                return BadRequest("Nevalidan ID usluge!");
            }

            if(idKorisnika <= 0)
            {
                return BadRequest("Nevalidan ID korisnika!");
            }


            try
            {
                var zubar = await Context.Zubari.FindAsync(idZubara);
                var termin = await Context.Termini.FindAsync(idTermina);
                var usluga = await Context.Usluge.FindAsync(idUsluge);
                var korisnik = await Context.Korisnici.FindAsync(idKorisnika);

               var pom = Context.Zakazivanja
                            .Where(p => (p.Zubar.ID == idZubara && p.Termin.ID == idTermina) || (p.Korisnik.ID == korisnik.ID && p.Termin.ID == idTermina))
                            .FirstOrDefault();

                if(pom == null)
                {
                    Zakazano z = new Zakazano
                    {
                        Zubar = zubar,
                        Termin = termin,
                        Usluga = usluga,
                        Korisnik = korisnik
                    };

                    Context.Zakazivanja.Add(z);
                    await Context.SaveChangesAsync();
                    return Ok($"{korisnik.Ime} {korisnik.Prezime} je zakazao termin {termin.Vreme} kod Dr.{zubar.Ime} {zubar.Prezime}");
                }
                else
                {
                    return BadRequest("Korisnik vec ima zakazan pregled u ovom terminu. Izaberite drugi termin!");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzbrisiZakazano/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiZakazano(int id)
        {
            if(id <= 0)
            {
                return BadRequest("Nevalidan ID!");
            }

            try
            {
                var z = await Context.Zakazivanja.FindAsync(id);
                Context.Zakazivanja.Remove(z);
                await Context.SaveChangesAsync();
                return Ok("Zakazani termin je izbrisan!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzmeniRezervisano/{idZakazivanja}/{idTermina}/{idUsluge}/{idKorisnika}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniRezervisano(int idZakazivanja,int idTermina,int idUsluge,int idKorisnika)
        {
            if(idZakazivanja <= 0)
            {
                return BadRequest("Nevalidan ID zakazivanja!");
            }

            if(idTermina <= 0)
            {
                return BadRequest("Nevalidan ID termina!");
            }

            if(idTermina <= 0)
            {
                return BadRequest("Nevalidan ID usluge!");
            }

            try
            {
                var rez = await Context.Zakazivanja.FindAsync(idZakazivanja);
                var termin = await Context.Termini.FindAsync(idTermina);
                var usluga = await Context.Usluge.FindAsync(idUsluge);

                var pom = Context.Zakazivanja
                            .Where(p => (p.ID != idZakazivanja) && (p.Korisnik.ID == idKorisnika && p.Termin.ID == idTermina))
                            .FirstOrDefault();

                if(pom != null)
                {
                    return BadRequest("Korisnik vec ima zakazano u ovom terminu!");
                }
                
                rez.Usluga=usluga;
                rez.Termin=termin;
                await Context.SaveChangesAsync();
                return Ok($"Rezervacija je uspesno izmenjena!");
                
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiZakazivanje/{emailKorisnika}")]
        [HttpGet]
        public async Task<ActionResult> VratiZakazivanje(string emailKorisnika)
        {
            try{

                var k =  Context.Korisnici.Where(p => p.Email == emailKorisnika).FirstOrDefault();

                if(k == null){
                    return BadRequest("Korisnik sa unetom email adresom nije registrovan!");
                }

                var zakazao = await Context.Zakazivanja
                                .Include(p => p.Korisnik)
                                .Include(p => p.Termin)
                                .Include(p => p.Usluga)
                                .Include(p => p.Zubar)
                                .ThenInclude(p=> p.Ordinacija)
                                .Where(p => p.Korisnik.Email == emailKorisnika)
                                .Select(p => 
                                    new
                                    {
                                        Id = p.ID,
                                        Ime = p.Korisnik.Ime,
                                        Prezime = p.Korisnik.Prezime,
                                        Vreme = p.Termin.Vreme.ToString("dddd, dd MMMM yyyy HH:mm"),
                                        TipUsluge = p.Usluga.Tip,
                                        ImeZubara = p.Zubar.Ime,
                                        PrezimeZubara = p.Zubar.Prezime,
                                        Ordinacija = p.Zubar.Ordinacija.Naziv,
                                        IdZubara = p.Zubar.ID,
                                        VremeDT = p.Termin.Vreme,
                                        KorID = p.Korisnik.ID
                                    }
                                ).ToListAsync();

                return Ok(zakazao);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }

            
        }

        [Route("VratiZakazivanjaZubara/{idZubara}")]
        [HttpGet]
        public async Task<ActionResult> VratiZakazivanjaZubara(int idZubara)
        {
            if(idZubara <= 0)
            {
                return BadRequest("Nevalidan ID!");
            }

            var zakazao = await Context.Zakazivanja
                            .Include(p => p.Korisnik)
                            .Include(p => p.Termin)
                            .Include(p => p.Usluga)
                            .Where(p => p.Zubar.ID == idZubara)
                            .Select(p => 
                                new
                                {
                                    Ime = p.Korisnik.Ime,
                                    Prezime = p.Korisnik.Prezime,
                                    Vreme = p.Termin.Vreme,
                                    TipUsluge = p.Usluga.Tip,
                                }
                            ).ToListAsync();

            return Ok(zakazao);

            
        }

        
    }
}