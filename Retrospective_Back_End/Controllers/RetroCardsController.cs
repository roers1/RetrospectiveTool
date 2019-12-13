using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Retrospective_Core.Models;
using Retrospective_Core.Services;
using Retrospective_EFSQLRetrospectiveDbImpl;

namespace Retrospective_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetroCardsController : ControllerBase
    {
        private readonly IRetroRespectiveRepository _context;

        public RetroCardsController(IRetroRespectiveRepository context)
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
		public ActionResult<RetroCard> GetRetroCard(int id)
		{
			var retroCard = _context.RetroCards.FirstOrDefault(r => r.Id == id);

			if (retroCard == null)
			{
				return NotFound();
			}

			return retroCard;
		}

		// PUT: api/RetroCards/5
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for
		// more details see https://aka.ms/RazorPagesCRUD.
		[HttpPut]
		public IActionResult PutRetroCard()
		{
			RetroCard retroCard = GetJSONFromBody(Request.Body);

			if (retroCard == null)
			{
				return BadRequest();
			};

			try
			{
				_context.SaveRetroCard(retroCard);
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!RetroCardExists(retroCard.Id))
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
		public ActionResult<RetroCard> PostRetroCard()
		{
			RetroCard retroCard = GetJSONFromBody(Request.Body);

			if (retroCard == null)
			{
				return BadRequest();
			};

			try
			{
				_context.SaveRetroCard(retroCard);
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!RetroCardExists(retroCard.Id))
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

		// DELETE: api/RetroCards/5
		[HttpDelete("{id}")]
		public ActionResult<RetroCard> DeleteRetroCard(int id)
		{
			RetroCard retroCard = _context.RetroCards.FirstOrDefault(r => r.Id == id);
			if (retroCard == null)
			{
				return NotFound();
			}

			_context.RemoveRetroCard(retroCard);

			return retroCard;
		}

		private bool RetroCardExists(int id)
        {
            return _context.RetroCards.Any(e => e.Id == id);
        }

        private RetroCard GetJSONFromBody(Stream req)
        {
	        req.Seek(0, System.IO.SeekOrigin.Begin);
	        string json = new StreamReader(req).ReadToEnd();

	        RetroCard input = null;

	        try
	        {
		        input = JsonConvert.DeserializeObject<RetroCard>(json);
	        }
	        catch (Exception ex)
	        {
		        throw ex;
	        }

	        return input;
        }
    }
}
