using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Retrospective_Core.Models;

namespace Retrospective_EFSQLRetrospectiveDbImpl.Seeds
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            //RetrospectiveDbContext context = app.Service.GetRequiredService<RetrospectiveDbContext>();
            using (var context = new RetroSpectiveDbContext(

                    serviceProvider.GetRequiredService<DbContextOptions<RetroSpectiveDbContext>>()))
            {

                // Look for any dishes.
                if (context.RetroCards.Any())
                {
                    return;   // DB has been seeded
                }


                //Seet Dish data

                var retroCards = new RetroCard[]
                {
                new RetroCard { Content = "Volgende keer beter" },
                new RetroCard { Content = "Jan deed zijn werk goed" },
                new RetroCard { Content = "Tieneke kon soms beter opletten tijdens vergaderingen" },
                new RetroCard { Content = "Ik voel me niet fijn" },
                new RetroCard { Content = "Peter doet dat beter!" },
                new RetroCard { Content = "Als groep konden we beter samenwerken." },

                };

                foreach (RetroCard d in retroCards)
                {
                    context.RetroCards.Add(d);
                }
                context.SaveChanges();
            }

        }
    
    }
}