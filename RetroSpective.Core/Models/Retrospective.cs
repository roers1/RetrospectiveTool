using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RetroSpective.Core.Models {
    public class RetroSpective {

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }

        [ForeignKey("RetroColumns")]
        public virtual RetroColumn[] RetroColumns { get; set; }
    }
}
