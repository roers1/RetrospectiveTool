using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Retrospective_Core.Models;
using Retrospective_EFSQLRetrospectiveDbImpl;

namespace Retrospective_Back_End.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RetroCardController : ControllerBase
    {
        private readonly RetroSpectiveDbContext _context;

        public RetroCardController(RetroSpectiveDbContext context)
        {
            _context = context;
        }

        // GET: /RetroCards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RetroCard>>> GetRetroCards()
        {
            return await _context.RetroCards.ToListAsync();
        }

        // GET: /RetroCards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RetroCard>> GetRetroCard(int id)
        {
            var retroCard = await _context.RetroCards.FindAsync(id);

            if (retroCard == null)
            {
                return NotFound();
            }

            return retroCard;
        }

        // PUT: /RetroCards/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRetroCard(int id, RetroCard retroCard)
        {
            if (id != retroCard.Id)
            {
                return BadRequest();
            }

            _context.Entry(retroCard).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RetroCardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: /RetroCards
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<RetroCard>> PostRetroCard(RetroCard retroCard)
        {
            _context.RetroCards.Add(retroCard);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRetroCard", new { id = retroCard.Id }, retroCard);
        }

        // DELETE: /RetroCards/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RetroCard>> DeleteRetroCard(int id)
        {
            var retroCard = await _context.RetroCards.FindAsync(id);
            if (retroCard == null)
            {
                return NotFound();
            }

            _context.RetroCards.Remove(retroCard);
            await _context.SaveChangesAsync();

            return retroCard;
        }

        private bool RetroCardExists(int id)
        {
            return _context.RetroCards.Any(e => e.Id == id);
        }
    }
}
