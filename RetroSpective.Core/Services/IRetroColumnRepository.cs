using System.Linq;
using Retrospective_Core.Models;

namespace Retrospective_Core.Services {

    public interface IRetroColumnRepository {

        IQueryable<RetroColumn> RetroColumns { get; }

    }
}
