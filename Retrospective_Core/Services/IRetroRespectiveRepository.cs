using System.Collections.Generic;
using System.Linq;
using Retrospective_Core.Models;

namespace Retrospective_Core.Services
{
    public interface IRetroRespectiveRepository
    {

        IQueryable<Retrospective> Retrospectives { get; }
        IQueryable<RetroColumn> RetroColumns { get; }
        IQueryable<RetroCard> RetroCards { get; }
        void SaveRetroCard(RetroCard retroCard);
        RetroCard UpdateRetroCard(RetroCard retroCard);
        void RemoveRetroCard(RetroCard retroCard);
        void SaveRetroColumn(RetroColumn retroColumn);
        void RemoveRetroColumn(RetroColumn retroColumn);
        void SaveRetrospective(Retrospective retrospective);
        void RemoveRetrospective(Retrospective retrospective);
    }
}
