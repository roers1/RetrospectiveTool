using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RetroSpective.Core.Models;
using RetroSpective.Core.Services;
using RetroSpective.Core.TempData;

namespace Retrospective_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetroCardController : ControllerBase
    {
        private IRetroCardRepository _repository;

        public RetroCardController(IRetroCardRepository repository)
        {
            _repository = repository;
        }

        // GET: api/RetroCard
        [HttpGet]
        public IEnumerable<RetroCard> Get()
        {
            return _repository.RetroCards;
        }

        // GET: api/RetroCard/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/RetroCard
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/RetroCard/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
