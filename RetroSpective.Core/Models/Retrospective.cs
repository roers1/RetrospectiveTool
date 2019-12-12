using System;
using System.Collections.Generic;
using System.Text;

namespace RetroSpective.Core.Models {
    public class RetroSpective {

        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }

        public virtual RetroColumn[] RetroColumns { get; set; }
    }
}
