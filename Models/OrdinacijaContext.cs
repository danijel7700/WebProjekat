using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class OrdinacijaContext : DbContext
    {
        public DbSet<Ordinacija> Ordinacije { get; set; }
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Termin> Termini { get; set; }
        public DbSet<Usluga> Usluge { get; set; }
        public DbSet<Zubar> Zubari { get; set; }
        public DbSet<Zakazano> Zakazivanja { get; set; }
        public DbSet<Spoj> Spojevi { get; set; }

        public OrdinacijaContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}