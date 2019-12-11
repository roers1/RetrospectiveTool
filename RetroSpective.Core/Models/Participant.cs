using System.ComponentModel.DataAnnotations;

namespace Retrospective_Core.Models {
    public class Participant {

        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
