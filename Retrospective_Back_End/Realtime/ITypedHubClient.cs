using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Retrospective_Back_End.Realtime
{
    public interface ITypedHubClient
    {
        Task BroadcastMessage(bool succeeded, int id);
    }
}
