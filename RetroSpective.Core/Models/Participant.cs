using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RetroSpective.Core.Models {
    public class Participant {

        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
