using Microsoft.EntityFrameworkCore;
using RetroSpective.Core.Models;
using System;

namespace RetroSpective.EFSQLRetroSpectiveDbImpl {
    public class RetroSpectiveDbContext : DbContext {

        public RetroSpectiveDbContext(DbContextOptions<RetroSpectiveDbContext> options) : base(options) { }

        public DbSet<Participant> Participants { get; set; }

        public DbSet<Facilitator> Facilitators { get; set; }

        public DbSet<Core.Models.RetroSpective> RetroSpectives { get; set; }

        public DbSet<RetroColumn> RetroColumns { get; set; }

        public DbSet<RetroCard> RetroCards { get; set; }
    }
}
