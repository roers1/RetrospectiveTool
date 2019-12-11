using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroSpective.Core.Models;
using RetroSpective.EFSQLRetroSpectiveDbImpl;

namespace Retrospective_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetroCardsController : ControllerBase
    {
        private readonly RetroSpectiveDbContext _context;

        public RetroCardsController(RetroSpectiveDbContext context)
        {
            _context = context;
        }

        // GET: api/RetroCards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RetroCard>>> GetRetroCards()
        {
            return await _context.RetroCards.ToListAsync();
        }

        // GET: api/RetroCards/5
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

        // PUT: api/RetroCards/5
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

        // POST: api/RetroCards
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<RetroCard>> PostRetroCard(RetroCard retroCard)
        {
            _context.RetroCards.Add(retroCard);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRetroCard", new { id = retroCard.Id }, retroCard);
        }

        // DELETE: api/RetroCards/5
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
