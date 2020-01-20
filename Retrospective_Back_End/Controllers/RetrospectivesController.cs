﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Retrospective_Core.Services;
using Retrospective_Core.Models;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System;
using Retrospective_Back_End.Utils;
using Microsoft.AspNetCore.SignalR;
using Retrospective_Back_End.Realtime;

namespace Retrospective_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetrospectivesController : ControllerBase
    {
        private readonly IRetroRespectiveRepository _context;
        private readonly IDecoder decoder;
        private readonly IHubContext<NotifyHub, ITypedHubClient> hubContext;

        public RetrospectivesController(IRetroRespectiveRepository context, IDecoder decoder, IHubContext<NotifyHub, ITypedHubClient> signlar)
        {
            _context = context;
            this.decoder = decoder;
            hubContext = signlar;
        }

        /// <summary>
        /// Get all Retrospectives
        /// </summary>
        // GET: api/Retrospectives
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Retrospective>>> GetRetrospectives()
        {
            var id = decoder.DecodeToken(Request != null ? (Request.Headers.ContainsKey("token") ? Request.Headers["token"].ToString() : null) : null);

            if (id == null)
            {
                return Unauthorized();
            }

            return await Task.FromResult(_context.GetAll().Where(x => x.RetroUserId == int.Parse(id)).ToList());
        }

        /// <summary>
        /// Get single Retrospective by id
        /// </summary>
        // GET: api/Retrospectives/5
        [HttpGet("{id}")]
        public ActionResult<Retrospective> GetRetrospective(int id)
        {
            var retrospective = _context.Retrospectives.Include(c => c.RetroColumns).ThenInclude(s => s.RetroCards)
                .Include(c => c.RetroColumns).ThenInclude(s => s.RetroFamilies).ThenInclude(c => c.RetroCards)
                .FirstOrDefault(r => r.Id == id);

            ICollection<RetroCard> removedRetroCards = new List<RetroCard>();

            if (retrospective != null)
            {
                foreach (RetroColumn r in retrospective.RetroColumns)
                {
                    foreach (RetroCard i in r.RetroCards)
                    {
                        RetroCard c = (RetroCard)i;
                        if (c.RetroFamily != null)
                        {
                            removedRetroCards.Add(i);
                        }
                    }

                    foreach (RetroCard i in removedRetroCards)
                    {
                        r.RetroCards.Remove(i);
                    }
                }
            }


            if (retrospective == null)
            {
                return NotFound();
            }

            return retrospective;
        }

        /// <summary>
        /// Update a Retrospective by id
        /// </summary>
        // PUT: api/Retrospectives/5
        [HttpPut]
        public IActionResult PutRetrospective(Retrospective retrospective)
        {
            var decodedId = decoder.DecodeToken(Request != null ? Request.Headers["token"].ToString() : null);

            if (retrospective == null)
                return NotFound();

            if (decodedId == null || retrospective.RetroUserId != int.Parse(decodedId))
                return Unauthorized();

            _context.SaveRetrospective(retrospective);

            if (hubContext.Clients != null)
            {
                try
                {
                    hubContext.Clients.All.BroadcastMessage(true, retrospective.Id);
                }
                catch (Exception e)
                {
                    hubContext.Clients.All.BroadcastMessage(false, retrospective.Id);
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Create a new Retrospective
        /// </summary>
        // POST: api/Retrospectives
        [HttpPost]
        public ActionResult<Retrospective> PostRetrospective(Retrospective retrospective)
        {
            var id = decoder.DecodeToken(Request != null ? (Request.Headers.ContainsKey("token") ? Request.Headers["token"].ToString() : null) : null);


            if (id != null)
            {
                retrospective.RetroUserId = int.Parse(id);

                retrospective = ThreeColumnTemplate(retrospective);

                _context.SaveRetrospective(retrospective);
            }
            else
            {
                return Unauthorized();
            }

            return CreatedAtAction("GetRetrospective", new { id = retrospective.Id }, retrospective);
        }

        /// <summary>
        /// Delete a Retrospective by id
        /// </summary>
        // DELETE: api/Retrospectives/
        [HttpDelete("{id}")]
        public ActionResult<Retrospective> DeleteRetrospective(int id)
        {
            var retrospective = _context.Retrospectives.First(r => r.Id == id);

            var decodedId = decoder.DecodeToken(Request != null ? (Request.Headers.ContainsKey("token") ? Request.Headers["token"].ToString() : null) : null);

            if (retrospective == null)
                return NotFound();

            if (decodedId == null || retrospective.RetroUserId != int.Parse(decodedId))
                return Unauthorized();


            _context.RemoveRetrospective(retrospective);

            if (hubContext.Clients != null)
            {
                try
                {
                    hubContext.Clients.All.BroadcastMessage(true, id);
                }
                catch (Exception e)
                {
                    hubContext.Clients.All.BroadcastMessage(false, id);
                }
            }

            return retrospective;
        }

        private bool RetrospectiveExists(int id)
        {
            return _context.Retrospectives.Any(e => e.Id == id);
        }

        /// <summary>
        /// Delete all RetroCards and RetroItems from a Retrospective by id
        /// </summary>
        // DELETE: api/Retrospectives/{id}/RetroCards
        [HttpDelete("{id}/RetroCards")]
        public ActionResult<Retrospective> CleanRetrospective(int id)
        {
            var retrospective = _context.Retrospectives
                .Include(c => c.RetroColumns)
                .ThenInclude(s => s.RetroCards)
                .Include(c => c.RetroColumns)
                .ThenInclude(s => s.RetroFamilies)
                .ThenInclude(x => x.RetroCards)
                .FirstOrDefault(r => r.Id == id);

            var decodedId = decoder.DecodeToken(Request != null ? (Request.Headers.ContainsKey("token") ? Request.Headers["token"].ToString() : null) : null);


            if (retrospective == null)
                return NotFound();

            if (decodedId == null || retrospective.RetroUserId != int.Parse(decodedId))
                return Unauthorized();

            _context.CleanRetrospective(retrospective);

            return retrospective;
        }



        private Retrospective ThreeColumnTemplate(Retrospective retrospective)
        {
            var columns = new List<RetroColumn>
            {
                new RetroColumn
                {
                    Title = "To do"
                },
                new RetroColumn
                {
                    Title = "Doing"
                },

                new RetroColumn
                {
                    Title = "Done"
                }
            };

            foreach (RetroColumn r in columns)
            {
                retrospective.RetroColumns.Add(r);
            }

            return retrospective;
        }
    }
}
