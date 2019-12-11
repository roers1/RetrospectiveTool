using RetroSpective.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RetroSpective.EFSQLRetroSpectiveDbImpl {
    public class EFRetrospectiveRepository : IRetroRespectiveRepository {

        private readonly RetroSpectiveDbContext Context;

        public EFRetrospectiveRepository(RetroSpectiveDbContext context) {
            this.Context = context;
        }


        public IQueryable<Core.Models.RetroSpective> RetroSpectives => Context.RetroSpectives;
    }
}
