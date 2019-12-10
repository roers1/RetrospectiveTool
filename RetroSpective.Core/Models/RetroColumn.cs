using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RetroSpective.Core.Models {
    public class RetroColumn {

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        [ForeignKey("RetroCards")]
        public virtual RetroCard[] RetroCards { get; set; }
    }
}
