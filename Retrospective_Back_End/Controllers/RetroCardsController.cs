using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Retrospective_Back_End.Realtime;
using Retrospective_Core.Models;
using Retrospective_Core.Services;

namespace Retrospective_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetroCardsController : ControllerBase
    {
        private readonly IRetroRespectiveRepository _context;
		private IHubContext<NotifyHub, ITypedHubClient> _hubContext;

		public RetroCardsController(IRetroRespectiveRepository context, IHubContext<NotifyHub, ITypedHubClient> hubContext)
        {
            _context = context;
			_hubContext = hubContext;
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

        // PUT: api/RetroCards
        [HttpPut]
        public ActionResult<RetroCard> UpdateRetroCard(RetroCard retroCard)
        {
            _context.SaveRetroCard(retroCard);
            return retroCard;
        }

		// POST: api/RetroCards
		[HttpPost]
		public ActionResult<RetroCard> PostRetroCard(RetroCard retroCard)
		{
			_context.SaveRetroCard(retroCard);

            RetroColumn retroColumn = _context.RetroColumns.Single(x => x.Id == retroCard.RetroColumnId);

            try {
				_hubContext.Clients.All.BroadcastMessage(true, retroColumn.RetrospectiveId);
			}
			catch (Exception e)
			{
				_hubContext.Clients.All.BroadcastMessage(false, retroColumn.RetrospectiveId);
			}
			return CreatedAtAction("GetRetroCard", new { id = retroCard.Id }, retroCard);
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
    }
}
