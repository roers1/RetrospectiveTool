using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Retrospective_Core.Models {

    public class Facilitator {

        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public Retrospective Retrospective { get; set; }

        public ICollection<Participant> Participants { get; set; }

    }
}