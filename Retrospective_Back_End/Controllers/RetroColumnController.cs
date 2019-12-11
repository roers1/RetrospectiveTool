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
    public class RetroColumnController : ControllerBase
    {
        private readonly RetroSpectiveDbContext _context;

        public RetroColumnController(RetroSpectiveDbContext context)
        {
            _context = context;
        }

        // GET: /RetroColumn
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RetroColumn>>> GetRetroColumns()
        {
            return await _context.RetroColumns.ToListAsync();
        }

        // GET: /RetroColumn/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RetroColumn>> GetRetroColumn(int id)
        {
            var retroColumn = await _context.RetroColumns.FindAsync(id);

            if (retroColumn == null)
            {
                return NotFound();
            }

            return retroColumn;
        }

        // PUT: /RetroColumn/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRetroColumn(int id, RetroColumn retroColumn)
        {
            if (id != retroColumn.Id)
            {
                return BadRequest();
            }

            _context.Entry(retroColumn).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RetroColumnExists(id))
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

        // POST: /RetroColumn
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{id}")]
        public async Task<ActionResult<RetroColumn>> PostRetroColumn(int id, RetroColumn retroColumn)
        {
            var retrospective = await _context.Retrospectives.FindAsync(id);

            retroColumn.Retrospective = retrospective;

            _context.RetroColumns.Add(retroColumn);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRetroColumn", new { id = retroColumn.Id }, retroColumn);
        }

        // DELETE: /RetroColumn/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RetroColumn>> DeleteRetroColumn(int id)
        {
            var retroColumn = await _context.RetroColumns.FindAsync(id);
            if (retroColumn == null)
            {
                return NotFound();
            }

            _context.RetroColumns.Remove(retroColumn);
            await _context.SaveChangesAsync();

            return retroColumn;
        }

        private bool RetroColumnExists(int id)
        {
            return _context.RetroColumns.Any(e => e.Id == id);
        }
    }
}
