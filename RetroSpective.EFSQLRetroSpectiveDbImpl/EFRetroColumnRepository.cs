using RetroSpective.Core.Models;
using RetroSpective.Core.Services;
using RetroSpective.EFSQLRetroSpectiveDbImpl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Retrospective.EFSQLRetroSpectiveDbImpl {

    public class EFRetroColumnRepository : IRetroColumnRepository {

        private readonly RetroSpectiveDbContext Context;

        public EFRetroColumnRepository(RetroSpectiveDbContext context) {
            this.Context = context;
        }

        public IQueryable<RetroColumn> RetroColumns => Context.RetroColumns;
    }
}
