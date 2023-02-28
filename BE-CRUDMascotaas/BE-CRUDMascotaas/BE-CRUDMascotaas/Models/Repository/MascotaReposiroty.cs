using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotaas.Models.Repository
{
    public class MascotaReposiroty: IMascotaRepository
    {
        private readonly AplicationDbContext _context;
        public MascotaReposiroty(AplicationDbContext context)
        {

            _context = context;
        }

        public async Task<Mascota> AddMascota(Mascota mascota)
        {
            _context.Add(mascota);
            await _context.SaveChangesAsync();
            return mascota;
        }

        public async Task DeleteMascota(Mascota mascota)
        {
            _context.mascotas.Remove(mascota);
            await _context.SaveChangesAsync();
        }

      


        public async  Task<List<Mascota>> GetListMascotas()
        {
        return await   _context.mascotas.ToListAsync();
        }

        public async Task<Mascota> GetMascota(int id)
        {
         return await _context.mascotas.FindAsync(id);
        }

        public async Task UpdateMascota(Mascota mascota)
        {

            var mascotaItem = await _context.mascotas.FirstOrDefaultAsync(x => x.Id == mascota.Id);

            if(mascotaItem != null)
            {
                mascotaItem.Nombre = mascota.Nombre;
                mascotaItem.Raza = mascota.Raza;
                mascotaItem.Edad = mascota.Edad;
                mascotaItem.Peso = mascota.Peso;
                mascotaItem.Color = mascota.Color;

                await _context.SaveChangesAsync();
            }

           


           
        }
    }
}
