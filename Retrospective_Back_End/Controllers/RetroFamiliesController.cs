using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Retrospective_Back_End.Realtime;
using Retrospective_Core.Models;
using Retrospective_Core.Services;

namespace Retrospective_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetroFamiliesController : ControllerBase
    {
        private readonly IRetroRespectiveRepository _repo;
        private readonly IHubContext<NotifyHub, ITypedHubClient> _hubContext;

        public RetroFamiliesController(IRetroRespectiveRepository repo, IHubContext<NotifyHub, ITypedHubClient> Context)
        {
            this._repo = repo;
            this._hubContext = Context;
        }

        // GET: api/RetroFamilies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RetroFamily>>> Get()
        {
            return await Task.FromResult(_repo.BaseItems.OfType<RetroFamily>().ToList());
        }

        // GET: api/RetroFamily/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<RetroFamily> Get(int id)
        {
            var family = _repo.BaseItems.OfType<RetroFamily>().Include(retroFamily => retroFamily.RetroCards)
                .FirstOrDefault(x => x.Id == id);

            if (family == null)
                return NotFound();

            return family;
        }

        // POST: api/RetroFamily
        [HttpPost]
        public ActionResult<RetroFamily> Post([FromBody] RetroFamily retroFamily)
        {
            _repo.SaveBaseItem(retroFamily);
            return retroFamily;
        }

        // PUT: api/RetroFamily/5
        [HttpPut]
        public void Put([FromBody] RetroFamily retroFamily)
        {
            _repo.SaveBaseItem(retroFamily);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<RetroFamily> Delete(int id)
        {
            var family = _repo.BaseItems.OfType<RetroFamily>().FirstOrDefault(x => x.Id == id);

            if (family == null)
                return NotFound();

            else
            {
                _repo.RemoveBaseItem(family);
                return family;
            }
        }
    }
}