using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Retrospective_Core.Models
{
	public abstract class BaseItem
	{
		[Key]
		public int Id { get; set; }

		public string Content { get; set; }

		public int Position { get; set; }

		[ForeignKey("RetroColumnId")]
		public int RetroColumnId { get; set; }

		public virtual RetroColumn RetroColumn { get; set; }
    }
}
