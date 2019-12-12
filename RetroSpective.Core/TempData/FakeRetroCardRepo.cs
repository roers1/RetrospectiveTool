using System;
using System.Collections.Generic;
using System.Text;
using RetroSpective.Core.Services;
using System.Linq;
using RetroSpective.Core.Models;


namespace RetroSpective.Core.TempData
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
