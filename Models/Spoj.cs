using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Spoj")]
    public class Spoj
    {
        [Key]
        public int ID { get; set; }

        public Usluga Usluga { get; set; }

        public Zubar Zubar { get; set; }

    }
}