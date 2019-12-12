using RetroSpective.Core.Models;
using RetroSpective.Core.Services;
using RetroSpective.EFSQLRetroSpectiveDbImpl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Retrospective.EFSQLRetroSpectiveDbImpl {
    public class EFParticipantRepository : IParticipantRepository {

        private readonly RetroSpectiveDbContext Context;

        public EFParticipantRepository(RetroSpectiveDbContext context) {
            this.Context = context;
        }

        public IQueryable<Participant> Participants => Context.Participants;
    }
}
