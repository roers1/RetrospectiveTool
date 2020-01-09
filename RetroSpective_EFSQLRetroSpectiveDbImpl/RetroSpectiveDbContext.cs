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

	        modelBuilder.Entity<BaseItem>()
		        .HasOne(i => i.RetroColumn)
		        .WithMany(r => r.RetroItems)
				.HasForeignKey(i => i.RetroColumnId)
		        .OnDelete(DeleteBehavior.NoAction);

	        modelBuilder.Entity<RetroFamily>()
		        .HasMany(i => i.RetroCards)
		        .WithOne(i => i.RetroFamily)
				.IsRequired(false)
		        .OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<RetroCard>()
		        .HasOne(i => i.RetroFamily)
		        .WithMany(i => i.RetroCards)
				.HasForeignKey(i => i.RetroFamilyId)
		        .OnDelete(DeleteBehavior.NoAction);

			modelBuilder.Entity<RetroCard>().HasBaseType<BaseItem>();
	        modelBuilder.Entity<RetroFamily>().HasBaseType<BaseItem>();
        }

        public virtual DbSet<Retrospective> Retrospectives { get; set; }

        public virtual DbSet<RetroColumn> RetroColumns { get; set; }

        public virtual DbSet<BaseItem> BaseItem { get; set; }
    }
}
