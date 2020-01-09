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
	        using var context = new RetroSpectiveDbContext(

		        serviceProvider.GetRequiredService<DbContextOptions<RetroSpectiveDbContext>>());
	        if (context.Retrospectives.Any(x => x.Title == "Training 1"))
	        {
		        return;   // DB has been seeded
	        }


	        Retrospective retrospective = new Retrospective
	        {
		        CreatedDate = new DateTime(),
		        Description = "Welkom bij de eerste retro training",
		        Title = "Training 1"
	        };

	        RetroColumn retroColumn1 = new RetroColumn { Title = "Dit is collom 1" };
	        RetroColumn retroColumn2 = new RetroColumn { Title = "Dit is collom 2" };
	        RetroColumn retroColumn3 = new RetroColumn { Title = "Dit is collom 3" };

			RetroFamily retroFamily1 = new RetroFamily { Content = "Dit is familie 1" };

	        RetroCard retroCard1 = new RetroCard { Content = "Ik sta in collom 1 als het goed is" };

	        RetroCard retroCard2 = new RetroCard { Content = "Ik sta in collom 2 als het goed is" };

	        RetroCard retroCard3 = new RetroCard { Content = "Ik sta in collom 3 als het goed is" };

	        RetroCard retroCard4 = new RetroCard { Content = "Ik sta in collom 3 als het goed is", Position = 1 };

	        context.BaseItem.Add(retroCard1);
	        context.BaseItem.Add(retroCard2);
	        context.BaseItem.Add(retroCard3);
	        context.BaseItem.Add(retroCard4);


			retroColumn1.RetroItems.Add(retroCard1);
			retroColumn2.RetroItems.Add(retroCard2);
			retroColumn3.RetroItems.Add(retroCard3);
			retroColumn3.RetroItems.Add(retroCard4);

			retroColumn1.RetroItems.Add(retroCard1);
	        retroColumn2.RetroItems.Add(retroCard2);
	        retroColumn3.RetroItems.Add(retroCard3);
	        retroColumn3.RetroItems.Add(retroCard4);

	        context.RetroColumns.Add(retroColumn1);
	        context.RetroColumns.Add(retroColumn2);
	        context.RetroColumns.Add(retroColumn3);

	        retrospective.RetroColumns.Add(retroColumn1);
	        retrospective.RetroColumns.Add(retroColumn2);
	        retrospective.RetroColumns.Add(retroColumn3);

	        context.Retrospectives.Add(retrospective);

	        context.SaveChanges();
        }
    
    }
}