using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Zubar")]
    public class Zubar
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(30)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(30)]
        public string Prezime { get; set; }

        [Required]
        public int Godine { get; set; }

        public Ordinacija Ordinacija { get; set; }

        public List<Zakazano> ZakazaniTermini { get; set; }

        public List<Spoj> Usluge { get; set; }
    }
}