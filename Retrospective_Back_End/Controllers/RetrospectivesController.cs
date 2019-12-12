using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Retrospective_Core.Services;
using Retrospective_Core.Models;

namespace Retrospective_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetrospectivesController : ControllerBase
    {
        private readonly IRetroRespectiveRepository _context;

        public RetrospectivesController(IRetroRespectiveRepository context)
        {
            _context = context;
        }

        // GET: api/Retrospectives
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Retrospective>>> GetRetrospectives()
        {
            return await _context.Retrospectives.Include(c => c.RetroColumns).ThenInclude(s => s.RetroCards).ToListAsync();
        }

        // GET: api/Retrospectives/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Retrospective>> GetRetrospective(int id)
        {
            var retrospective = _context.Retrospectives.Include(c => c.RetroColumns).ThenInclude(s => s.RetroCards).FirstOrDefault(r => r.Id == id);

            if (retrospective == null)
            {
                return NotFound();
            }

            return retrospective;
        }

        // PUT: api/Retrospectives/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRetrospective(int id, Retrospective retrospective)
        {
            if (id != retrospective.Id)
            {
                return BadRequest();
            }

            try
            {
                _context.SaveRetrospective(retrospective);
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

        // POST: api/Retrospectives
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Retrospective>> PostRetrospective(Retrospective retrospective)
        {
            _context.SaveRetrospective(retrospective);

            return CreatedAtAction("GetRetrospective", new { id = retrospective.Id }, retrospective);
        }

        // DELETE: api/Retrospectives/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Retrospective>> DeleteRetrospective(int id)
        {
            var retrospective = _context.Retrospectives.First(r => r.Id == id);
            if (retrospective == null)
            {
                return NotFound();
            }

            _context.RemoveRetrospective(retrospective);
      
            return retrospective;
        }

        private bool RetrospectiveExists(int id)
        {
            return _context.Retrospectives.Any(e => e.Id == id);
        }
    }
}
