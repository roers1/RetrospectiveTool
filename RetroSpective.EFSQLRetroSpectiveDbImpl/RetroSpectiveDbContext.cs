using Microsoft.EntityFrameworkCore;
using Retrospective_Core.Models;

namespace Retrospective_EFSQLRetrospectiveDbImpl {
    public class RetroSpectiveDbContext : DbContext {

        public RetroSpectiveDbContext(DbContextOptions<RetroSpectiveDbContext> options) : base(options) { }

        //public DbSet<Participant> Participants { get; set; }

        //public DbSet<Facilitator> Facilitators { get; set; }

        public DbSet<Retrospective> Retrospectives { get; set; }

        public DbSet<RetroColumn> RetroColumns { get; set; }

        public DbSet<RetroCard> RetroCards { get; set; }
    }
}
