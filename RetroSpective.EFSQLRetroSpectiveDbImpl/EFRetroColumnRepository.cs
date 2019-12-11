using System.Linq;
using Retrospective_Core.Models;
using Retrospective_Core.Services;

namespace Retrospective_EFSQLRetrospectiveDbImpl {

    public class EFRetroColumnRepository : IRetroColumnRepository {

        private readonly RetroSpectiveDbContext _context;

        public EFRetroColumnRepository(RetroSpectiveDbContext context) {
            this._context = context;
        }

        public IQueryable<RetroColumn> RetroColumns => _context.RetroColumns;
    }
}
