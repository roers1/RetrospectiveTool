using System.Collections.Generic;
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

        public IQueryable<RetroColumn> RetroColumns => _context.RetroColumns;

        public IQueryable<RetroCard> RetroCards => _context.RetroCards;

        public void RemoveRetrospective(Retrospective retrospective)
        {
	        _context.Retrospectives.Remove(retrospective);
	        _context.SaveChanges();
        }

        public void SaveRetrospective(Retrospective retrospective)
        {
            foreach(RetroColumn retroColumn in retrospective.RetroColumns)
            {
	            foreach (RetroCard retroCard in retroColumn.RetroCards)
	            {
		            _context.RetroCards.Add(retroCard);
	            }
	            _context.RetroColumns.Add(retroColumn);
            }

	        _context.Retrospectives.Add(retrospective);
	        _context.SaveChanges();
        }
    }
}
