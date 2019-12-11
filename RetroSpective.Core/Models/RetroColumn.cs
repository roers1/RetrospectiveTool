using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RetroSpective.Core.Models {
    public class RetroColumn {

        public int Id { get; set; }

        public string Title { get; set; }

        public virtual RetroCard[] RetroCards { get; set; }
    }
}
