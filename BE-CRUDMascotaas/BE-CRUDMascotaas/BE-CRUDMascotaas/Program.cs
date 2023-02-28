using BE_CRUDMascotaas.Models;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using BE_CRUDMascotaas.Models.Repository;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        //cors

        builder.Services.AddCors(options => options.AddPolicy("AllowWebapp",
            builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

        //add context

        builder.Services.AddDbContext<AplicationDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"));
        });
        //automapper

        builder.Services.AddAutoMapper(typeof(Program));

        //add services
        builder.Services.AddScoped<IMascotaRepository, MascotaReposiroty>();



        var app = builder.Build();


        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("AllowWebapp");

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}