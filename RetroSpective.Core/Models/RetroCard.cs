using System.ComponentModel.DataAnnotations;

namespace Retrospective_Core.Models {
    public class RetroCard {

        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public int Position { get; set; }
        public virtual RetroColumn RetroColumn { get; set; }

    }
}
