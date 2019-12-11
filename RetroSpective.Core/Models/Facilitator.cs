using System;
using System.Collections.Generic;
using System.Text;

namespace RetroSpective.Core.Models {

    public class Facilitator {

        public int Id { get; set; }

        public string Name { get; set; }

        public virtual RetroSpective RetroSpective { get; set; }

        public virtual ICollection<Participant> Participants { get; set; }
    }
}