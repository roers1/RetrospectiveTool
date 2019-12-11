using Microsoft.EntityFrameworkCore;
using Retrospective_Core.Models;

namespace Retrospective_EFSQLRetrospectiveDbImpl {
    public class RetroSpectiveDbContext : DbContext {

        public RetroSpectiveDbContext(DbContextOptions<RetroSpectiveDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
	        modelBuilder.Entity<Retrospective>()
		        .HasMany(i => i.RetroColumns)
		        .WithOne(c => c.Retrospective)
		        .IsRequired()
		        .OnDelete(DeleteBehavior.Cascade);

	        modelBuilder.Entity<RetroColumn>()
		        .HasMany(i => i.RetroCards)
		        .WithOne(c => c.RetroColumn)
		        .IsRequired()
		        .OnDelete(DeleteBehavior.Cascade);
        }


        //public DbSet<Participant> Participants { get; set; }

        //public DbSet<Facilitator> Facilitators { get; set; }

        public DbSet<Retrospective> Retrospectives { get; set; }

        public DbSet<RetroColumn> RetroColumns { get; set; }

        public DbSet<RetroCard> RetroCards { get; set; }
    }
}
