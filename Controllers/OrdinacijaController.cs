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
    public class OrdincaijaController : ControllerBase
    {
        
        public OrdinacijaContext Context { get; set; }

        public OrdincaijaController(OrdinacijaContext context)
        {
            Context = context;
        }

        [Route("VratiOrdinacije")]
        [HttpGet]
        public async Task<ActionResult> VratiOrdinacije()
        {
            try
            {
                return Ok(await Context.Ordinacije.Select(p =>
                new
                {
                    ID=p.ID,
                    Naziv=p.Naziv,
                    Adresa=p.Adresa
                }).ToListAsync()
                );
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiOrdinaciju/{id}")]
        [HttpGet]
        public async Task<ActionResult> VratiOrdinaciju(int id)
        {
            try
            {
                return Ok(await Context.Ordinacije.Where(p => p.ID == id).Select(p =>
                new
                {
                    Naziv=p.Naziv,
                    Adresa=p.Adresa
                }).ToListAsync()
                );
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /*[Route("DodajOrdinaciju")]
        [HttpPost]
        public async Task<ActionResult> DodajOrdinaciju([FromBody] Ordinacija ordinacija)
        {

            try
            {
                Context.Ordinacije.Add(ordinacija);
                await Context.SaveChangesAsync();
                return Ok($"ordinacija je dodat! ID je: {ordinacija.ID}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }


        }*/


       
    }
}
