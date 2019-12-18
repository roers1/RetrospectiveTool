using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Retrospective_Core.Models;
using Retrospective_Core.Services;

namespace Retrospective_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetroColumnsController : ControllerBase
    {
        private readonly IRetroRespectiveRepository _context;

        public RetroColumnsController(IRetroRespectiveRepository context)
        {
            _context = context;
        }

        // GET: api/RetroColumns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RetroColumn>>> GetRetroColumns()
        {
            return await _context.RetroColumns.Include(c => c.RetroCards).ToListAsync();
        }

        // GET: api/RetroColumns/5
        [HttpGet("{id}")]
        public ActionResult<RetroColumn> GetRetroColumn(int id)
        {
            var retroColumn = _context.RetroColumns.Include(c => c.RetroCards).FirstOrDefault(r => r.Id == id);

            if (retroColumn == null)
            {
                return NotFound();
            }

            return retroColumn;
        }

        // PUT: api/RetroColumns/5
        [HttpPut("{id}")]
        public ActionResult<RetroColumn> PutRetroColumn(int id, RetroColumn retroColumn)
        {
            var rc = retroColumn;

            rc.Id = id;

            var dbe = _context.UpdateRetroColumn(retroColumn);

            if (dbe == null)
            {
                return BadRequest();
            }

            return dbe;
        }

        // POST: api/RetroColumns
        [HttpPost]
        public ActionResult<RetroColumn> PostRetroColumn(RetroColumn retroColumn)
        {

            _context.SaveRetroColumn(retroColumn);
            return CreatedAtAction("GetRetroColumn", new { id = retroColumn.Id }, retroColumn);

        }

        // DELETE: api/RetroColumns/5
        [HttpDelete("{id}")]
        public ActionResult<RetroColumn> DeleteRetroColumn(int id)
        {
            RetroColumn retroColumn = _context.RetroColumns.FirstOrDefault(c => c.Id == id);
            if (retroColumn == null)
            {
                return NotFound();
            }

            _context.RemoveRetroColumn(retroColumn);

            return retroColumn;
        }

        private bool RetroColumnExists(int id)
        {
            return _context.RetroColumns.Any(e => e.Id == id);
        }
    }
}
