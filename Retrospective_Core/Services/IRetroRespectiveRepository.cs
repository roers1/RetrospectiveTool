using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Retrospective_Core.Models;

namespace Retrospective_Core.Services
{
    public interface IRetroRespectiveRepository
    {

	    IQueryable<Retrospective> Retrospectives { get; }
	    IQueryable<RetroColumn> RetroColumns { get; }
	    IQueryable<RetroCard> RetroCards { get; }
		IQueryable<RetroFamily> RetroFamilies { get; }
	    void SaveRetroCard(RetroCard retroCard);
		void RemoveRetroCard(RetroCard retroCard);
	    void SaveRetroColumn(RetroColumn retroColumn);
	    void RemoveRetroColumn(RetroColumn retroColumn);
	    void SaveRetrospective(Retrospective retrospective);
	    void RemoveRetrospective(Retrospective retrospective);
	    void SaveRetroFamily(RetroFamily retroFamily);
	    void RemoveRetroFamily(RetroFamily retroFamily);
		IQueryable<Retrospective> getAll();
    }
}
