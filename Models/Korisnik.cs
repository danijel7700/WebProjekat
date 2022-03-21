using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Korisnik")]
    public class Korisnik
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
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
        public string Email { get; set; }

        public List<Zakazano> ZakazaniTermini { get; set; }

       
    }
}