using AutoMapper;
using BE_CRUDMascotaas.Models.DTO;

namespace BE_CRUDMascotaas.Models.Profiles
{
    public class MascotaProfile: Profile
    {
        public MascotaProfile() {
            CreateMap<Mascota, MascotaDTO>();
            CreateMap<MascotaDTO, Mascota>();

        }
    }
}
