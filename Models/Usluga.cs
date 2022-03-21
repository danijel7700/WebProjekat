using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Usluga")]
    public class Usluga
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(30)]
        public string Tip { get; set; }

        public List<Zakazano> ZakazanTermin { get; set; }

        public List<Spoj> Zubari { get; set; }

    }
}