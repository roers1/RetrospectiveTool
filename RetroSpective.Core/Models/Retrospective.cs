using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Retrospective_Core.Models {
    public class Retrospective {

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }

        [ForeignKey("RetroColumns")]
        public virtual RetroColumn[] RetroColumns { get; set; }
    }
}
