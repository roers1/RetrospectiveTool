using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Retrospective_Core.Models {
    public class RetroCard : BaseItem {
        
        public int UpVotes { get; set; }

        public int DownVotes { get; set; }

        [ForeignKey("FamilyId")]
        public int FamilyId { get; set; }

        public virtual RetroFamily RetroFamily { get; set; }

    }
}
