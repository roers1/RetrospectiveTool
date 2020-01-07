using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Retrospective_Core.Models
{
    public class RetroFamily : BaseItem
    {
	    public ICollection<RetroCard> RetroCards { get; set; } = new List<RetroCard>();
    }
}
