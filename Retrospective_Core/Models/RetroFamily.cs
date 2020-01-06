using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Retrospective_Core.Models
{
    public class RetroFamily
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<RetroCard> RetroCards { get; set; } = new List<RetroCard>();

        [ForeignKey("RetroColumnId")]
        public int RetroColumnId { get; set; }

        public virtual RetroColumn RetroColumn { get; set; }
    }
}
