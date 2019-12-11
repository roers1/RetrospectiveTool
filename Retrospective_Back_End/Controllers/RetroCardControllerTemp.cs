using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Retrospective_Core.Models;
using Retrospective_Core.Services;

namespace Retrospective_Back_End.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RetroCardControllerTemp : ControllerBase
    {
        private IRetroCardRepository _repository;

        public RetroCardControllerTemp(IRetroCardRepository repository)
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
