using System.Linq;
using Retrospective_Core.Models;
using Retrospective_Core.Services;

namespace Retrospective_EFSQLRetrospectiveDbImpl {
    public class EFRetrospectiveRepository : IRetroRespectiveRepository {

        private readonly RetroSpectiveDbContext _context;

        public EFRetrospectiveRepository(RetroSpectiveDbContext context) {
            this._context = context;
        }


        public IQueryable<Retrospective> Retrospectives => _context.Retrospectives;
    }
}
