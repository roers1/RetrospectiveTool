using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RetroSpective.Core.Services {
    public interface IRetroRespectiveRepository {

        IQueryable<Models.RetroSpective> RetroSpectives { get; }

    }
}
