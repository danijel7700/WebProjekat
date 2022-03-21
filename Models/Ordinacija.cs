using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Ordinacija")]
    public class Ordinacija
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(30)]
        public string Naziv { get; set; }

        [Required]
        [MaxLength(50)]
        public string Adresa { get; set; }

        public List<Zubar> Zubari { get; set; }
    }
}