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
    public class KorisnikController : ControllerBase
    {
        public OrdinacijaContext Context { get; set; }

        public KorisnikController(OrdinacijaContext context)
        {
            Context = context;
        }

        [Route("DodajKorisnika/{ime}/{prezime}/{email}")]
        [HttpPost]
        public async Task<ActionResult> DodajKorisnika(string ime,string prezime,string email)
        {
            if(ime.Length > 30 || string.IsNullOrWhiteSpace(ime))
            {
                return BadRequest("Predugacko ime!");
            }

            if(prezime.Length > 30 || string.IsNullOrWhiteSpace(prezime))
            {
                return BadRequest("Predugacko ime!");
            }

            if(string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Unesi email!");
            }

            try
            {
                var kor = Context.Korisnici.Where(p => p.Email == email).FirstOrDefault();
                if(kor == null)
                {
                    Korisnik k = new Korisnik
                    {
                        Ime = ime,
                        Prezime = prezime,
                        Email = email
                    };
                    Context.Korisnici.Add(k);
                    await Context.SaveChangesAsync();
                    return Ok(k);
                }
                else return BadRequest("Korisnik vec postoji!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }


        }

        [Route("PromeniKorisnika")]
        [HttpPut]
        public async Task<ActionResult> PromeniKorisnika([FromBody] Korisnik korisnik)
        {
            if(korisnik.ID <= 0)
            {
                return BadRequest("Nevalidan ID!");
            }

            if(korisnik.Ime.Length > 30 || string.IsNullOrWhiteSpace(korisnik.Ime))
            {
                return BadRequest("Predugacko ime!");
            }

            if(korisnik.Prezime.Length > 30 || string.IsNullOrWhiteSpace(korisnik.Prezime))
            {
                return BadRequest("Predugacko ime!");
            }

            try
            {
                Context.Korisnici.Update(korisnik);
                await Context.SaveChangesAsync();
                return Ok("Korisnik je uspešno izmenjen!");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiKorisnika/{email}")]
        [HttpGet]
        public async Task<ActionResult> VratiKorisnika(string email)
        {
            try{
                var korisnik = Context.Korisnici.Where(p => p.Email == email).FirstOrDefault();

                if(korisnik == null)
                {
                    return BadRequest("Korisik sa unetom email adresom nije registrovan!");
                }
                return Ok(await Context.Korisnici.Where(p => p.Email == email).Select(p =>
                    new
                    {
                        Id = p.ID,
                        Ime = p.Ime,
                        Prezime = p.Prezime,
                        Email = p.Email
                    }).ToListAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiKorisnike")]
        [HttpGet]
        public async Task<ActionResult> VratiKorisnike()
        {
            
            return Ok(await Context.Korisnici.Select(p=>
            
                new{
                    Ime = p.Ime,
                    Prezime = p.Prezime,
                    Email = p.Email
                }
            ).ToListAsync());
        }

        


    }
}