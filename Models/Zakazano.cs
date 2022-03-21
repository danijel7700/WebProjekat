using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Zakazano")]
    public class Zakazano
    {
        [Key]
        public int ID { get; set; }

        public Zubar Zubar { get; set; }
        public Termin Termin { get; set; }
        public Korisnik Korisnik { get; set; }
        public Usluga Usluga { get; set; }

    }
}