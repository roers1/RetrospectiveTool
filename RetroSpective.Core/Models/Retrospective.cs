﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Retrospective_Core.Models {
    public class Retrospective {

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        [Column(TypeName = "Date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime CreatedDate { get; set; }

        public virtual ICollection<RetroColumn> RetroColumns { get; set; }

    }
}
