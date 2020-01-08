using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Retrospective_Core.Models {
    public class RetroColumn {

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public ICollection<BaseItem> RetroItems { get; set; } = new List<BaseItem>();

        [ForeignKey("RetrospectiveId")]
        public int RetrospectiveId { get; set; }

        public virtual Retrospective Retrospective { get; set; }
    }
}
