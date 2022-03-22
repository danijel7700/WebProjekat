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
    public class UslugaController : ControllerBase
    {
        
        public OrdinacijaContext Context { get; set; }

        public UslugaController(OrdinacijaContext context)
        {
            Context = context;
        }


        /*[Route("DodajUslugu")]
        [HttpPost]
        public async Task<ActionResult> DodajUslugu([FromBody] Usluga usluga)
        {

            try
            {
                Context.Usluge.Add(usluga);
                await Context.SaveChangesAsync();
                return Ok($"Termin je dodat! ID je: {usluga.ID}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }


        }*/

        [Route("VratiUsluge/{idZubara}")]
        [HttpGet]
        public async Task<ActionResult> VratiUsluge(int idZubara)
        {
            if(idZubara <= 0)
            {
                return BadRequest("Nevalidan ID!");
            }

            try
            {
                return Ok(await Context.Spojevi.Where(p => p.Zubar.ID == idZubara).Select(p =>
                new
                {
                    ID = p.Usluga.ID,
                    Tip = p.Usluga.Tip,
                    Cena = p.Usluga.Cena
                }).ToListAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /*[Route("IzbrisiUslugu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiUslugu(int id)
        {
            if(id <= 0)
            {
                return BadRequest("Nevalidan ID!");
            }

            try
            {
                var z = await Context.Usluge.FindAsync(id);
                Context.Usluge.Remove(z);
                await Context.SaveChangesAsync();
                return Ok("Usluga je izbrisana!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/
        
        


       
    }
}