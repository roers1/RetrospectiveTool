using System.Linq;
using Retrospective_Core.Models;

namespace Retrospective_Core.Services {
    public interface IFacilitatorRepository {

        IQueryable<Facilitator> Facilitators { get; }

    }
}
