using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Retrospective_Core.Models {
    public class RetroColumn {

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        [ForeignKey("RetroCards")]
        public virtual RetroCard[] RetroCards { get; set; }
    }
}
