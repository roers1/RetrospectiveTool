using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Retrospective_Core.Models;
using Retrospective_Core.Services;

namespace Retrospective_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetroFamiliesController : ControllerBase
    {
        private readonly IRetroRespectiveRepository _repo;

        public RetroFamiliesController(IRetroRespectiveRepository repo)
        {
            this._repo = repo;
        }

        // GET: api/RetroFamilies
        [HttpGet]
        public async Task<IEnumerable<RetroFamily>> Get()
        {
            return await _repo.RetroFamilies.ToListAsync();
        }

        // GET: api/RetroFamily/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<RetroFamily> Get(int id)
        {
            var family = _repo.RetroFamilies.Include(retroFamily => retroFamily.RetroCards)
                .FirstOrDefault(x => x.Id == id);

            if (family == null)
                return NotFound();

            return family;
        }

        // POST: api/RetroFamily
        [HttpPost]
        public ActionResult<RetroFamily> Post([FromBody] RetroFamily retroFamily)
        {
            _repo.SaveRetroFamily(retroFamily);
            return retroFamily;
        }

        // PUT: api/RetroFamily/5
        [HttpPut]
        public void Put([FromBody] RetroFamily retroFamily)
        {
            _repo.SaveRetroFamily(retroFamily);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<RetroFamily> Delete(int id)
        {
            var family = _repo.RetroFamilies.FirstOrDefault(x => x.Id == id);

            if (family == null)
                return NotFound();

            else
                return family;
        }
    }
}