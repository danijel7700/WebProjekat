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
    public class TerminController : ControllerBase
    {
        
        public OrdinacijaContext Context { get; set; }

        public TerminController(OrdinacijaContext context)
        {
            Context = context;
        }

        [Route("VratiTermine/{idZubara}")]
        [HttpGet]
        public async Task<ActionResult> VratiTermine(int idZubara)
        {
            try
            {   
                var pom = await Context.Zakazivanja.Where(p => p.Zubar.ID == idZubara).Select(p => p.Termin.ID).ToListAsync();

                return Ok( await Context.Termini.Where(p => !pom.Contains(p.ID)).Select(p=>
                new{
                    Id = p.ID,
                    Vreme = p.Vreme.ToString("dddd, dd MMMM yyyy HH:mm")
                }).ToListAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiTermin/{vreme}")]
        [HttpGet]
        public async Task<ActionResult> VratiTermin(DateTime vreme)
        {
            try
            {   
                return Ok(await Context.Termini.Where(p=>p.Vreme == vreme).Select(p=>p.ID).FirstOrDefaultAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /*[Route("DodajTermin")]
        [HttpPost]
        public async Task<ActionResult> DodajTermin([FromBody] Termin termin)
        {

            try
            {
                Context.Termini.Add(termin);
                await Context.SaveChangesAsync();
                return Ok($"Termin je dodat! ID je: {termin.ID}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }


        }*/
          
    }
}