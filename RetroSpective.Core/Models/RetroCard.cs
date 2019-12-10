using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RetroSpective.Core.Models {
    public class RetroCard {

        [Key]
        public int Id { get; set; }

        public string Content { get; set; }
    }
}
