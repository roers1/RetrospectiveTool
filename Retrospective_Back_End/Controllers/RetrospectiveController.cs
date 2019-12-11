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
    public class RetrospectiveController : ControllerBase
    {
        private readonly RetroSpectiveDbContext _context;

        public RetrospectiveController(RetroSpectiveDbContext context)
        {
            _context = context;
        }

        // GET: /Retrospectives
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Retrospective>>> GetRetrospectives()
        {
            return await _context.Retrospectives.Include(c => c.RetroColumns).ThenInclude(s => s.RetroCards).ToListAsync();
        }

        // GET: /Retrospectives/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Retrospective>> GetRetrospective(int id)
        {
            var retrospective = await _context.Retrospectives.Include(c => c.RetroColumns).ThenInclude(s => s.RetroCards).SingleOrDefaultAsync(i => i.Id == id);

            if (retrospective == null)
            {
                return NotFound();
            }

            return retrospective;
        }

        // PUT: /Retrospectives/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRetrospective(int id, Retrospective retrospective)
        {
            if (id != retrospective.Id)
            {
                return BadRequest();
            }

            _context.Entry(retrospective).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RetrospectiveExists(id))
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

        // POST: /Retrospectives
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Retrospective>> PostRetrospective(Retrospective retrospective)
        {
            _context.Retrospectives.Add(retrospective);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRetrospective", new { id = retrospective.Id }, retrospective);
        }

        // DELETE: /Retrospectives/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Retrospective>> DeleteRetrospective(int id)
        {
            var retrospective = await _context.Retrospectives.FindAsync(id);
            if (retrospective == null)
            {
                return NotFound();
            }

            _context.Retrospectives.Remove(retrospective);
            await _context.SaveChangesAsync();

            return retrospective;
        }

        private bool RetrospectiveExists(int id)
        {
            return _context.Retrospectives.Any(e => e.Id == id);
        }
    }
}
