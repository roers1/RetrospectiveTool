using RetroSpective.Core.Models;
using RetroSpective.Core.Services;
using RetroSpective.EFSQLRetroSpectiveDbImpl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Retrospective.EFSQLRetroSpectiveDbImpl {
    public class EFFacilitatorRepository : IFacilitatorRepository {

        private readonly RetroSpectiveDbContext Context;

        public EFFacilitatorRepository(RetroSpectiveDbContext context) {
            this.Context = context;
        }

        public IQueryable<Facilitator> Facilitators => Context.Facilitators;
    }
}
