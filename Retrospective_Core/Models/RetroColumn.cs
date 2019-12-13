﻿using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Retrospective_Core.Models {
    public sealed class RetroColumn {

        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public Retrospective Retrospective { get; set; }
        public ICollection<RetroCard> RetroCards { get; set; }

        public RetroColumn()
        {
            RetroCards = new List<RetroCard>();
        }

    }
}