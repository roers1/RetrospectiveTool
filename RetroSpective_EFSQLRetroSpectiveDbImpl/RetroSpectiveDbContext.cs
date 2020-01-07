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
		        .HasMany(i => i.RetroItems)
		        .WithOne(c => c.RetroColumn)
		        .IsRequired()
		        .OnDelete(DeleteBehavior.Cascade);
        }

        public virtual DbSet<Retrospective> Retrospectives { get; set; }

        public virtual DbSet<RetroColumn> RetroColumns { get; set; }

        public virtual DbSet<RetroCard> RetroCards { get; set; }
    }
}
