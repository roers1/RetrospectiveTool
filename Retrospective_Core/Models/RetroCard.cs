﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Retrospective_Core.Models {
    public class RetroCard {
        
        public int UpVotes { get; set; }

        public int DownVotes { get; set; }

        [ForeignKey("RetroFamilyId")]
        public int? RetroFamilyId { get; set; }

        public virtual RetroFamily RetroFamily { get; set; }

        [Key]
        public int Id { get; set; }

        public string Content { get; set; }

        public int Position { get; set; }

        [ForeignKey("RetroColumnId")]
        public int RetroColumnId { get; set; }
        public virtual RetroColumn RetroColumn { get; set; }
    }
}
