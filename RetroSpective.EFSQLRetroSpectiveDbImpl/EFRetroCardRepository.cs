using RetroSpective.Core.Models;
using RetroSpective.Core.Services;
using RetroSpective.EFSQLRetroSpectiveDbImpl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Retrospective.EFSQLRetroSpectiveDbImpl {

    public class EFRetroCardRepository : IRetroCardRepository {

        private readonly RetroSpectiveDbContext Context;

        public EFRetroCardRepository(RetroSpectiveDbContext context) {
            this.Context = context;
        }

        public IQueryable<RetroCard> RetroCards => Context.RetroCards;
    }
}
