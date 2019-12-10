using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RetroSpective.Core.Models {

    public class Facilitator {

        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        [ForeignKey("Retrospective")]
        public virtual RetroSpective RetroSpective { get; set; }

        [ForeignKey("Participants")]
        public virtual Participant[] Participants { get; set; }
    }
}