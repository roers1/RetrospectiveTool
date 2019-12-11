using System.Linq;
using Retrospective_Core.Models;
using Retrospective_Core.Services;

namespace Retrospective_EFSQLRetrospectiveDbImpl {

    public class EFRetroCardRepository : IRetroCardRepository {

        private readonly RetroSpectiveDbContext _context;

        public EFRetroCardRepository(RetroSpectiveDbContext context) {
            this._context = context;
        }

        public IQueryable<RetroCard> RetroCards => _context.RetroCards;
    }
}
