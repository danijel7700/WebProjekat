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
    public class ZubarController : ControllerBase
    {
        public OrdinacijaContext Context { get; set; }

        public ZubarController(OrdinacijaContext context)
        {
            Context = context;
        }

        [Route("VratiZubare/{idOrdinacije}")]
        [HttpGet]
        public async Task<ActionResult> VratiZubare(int idOrdinacije)
        {
            try
            {
                return Ok(await Context.Zubari.Where(p => p.Ordinacija.ID == idOrdinacije).Select(p =>
                new
                {
                    Id = p.ID,
                    Ime = p.Ime,
                    Prezime = p.Prezime
                }).ToListAsync()
                );
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiZubara/{id}")]
        [HttpGet]
        public async Task<ActionResult> VratiZubara(int id)
        {
            try
            {
                return Ok(await Context.Zubari.Where(p => p.ID == id).ToListAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /*[Route("DodajZubara")]
        [HttpPost]
        public async Task<ActionResult> DodajZubara([FromBody] Zubar zubar)
        {

            try
            {
                Context.Zubari.Add(zubar);
                await Context.SaveChangesAsync();
                return Ok($"Termin je dodat! ID je: {zubar.ID}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }


        }

        [Route("DodajTermin")]
        [HttpPost]
        public async Task<ActionResult> DodajTermin([FromBody] Spoj spoj)
        {

            try
            {
                Context.Spojevi.Add(spoj);
                await Context.SaveChangesAsync();
                return Ok($"Termin je dodat! ID je: {spoj.ID}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }


        }*/

        
    }
}