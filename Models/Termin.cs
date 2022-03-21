using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Termin")]
    public class Termin
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public DateTime Vreme { get; set; }

        public List<Zakazano> ZubarTermin { get; set; }
    }
}