using System.Collections.Generic;
using System.Linq;
using Retrospective_Core.Models;
using Retrospective_Core.Services;

namespace RetroSpective_Core.TempData
{
    public class FakeRetroCardRepo : IRetroCardRepository
    {
        public IQueryable<RetroCard> RetroCards => new List<RetroCard>{
           new RetroCard{ Content = "test123" },
           new RetroCard{ Content = "ik vind dit niet zo leuk" },
           new RetroCard{ Content = "het testen moet beter" },
           new RetroCard{ Content = "dat kan niet zo verder." },

        }.AsQueryable<RetroCard>();

        
    }
}
