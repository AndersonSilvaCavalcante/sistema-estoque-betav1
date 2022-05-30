using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Infra.Context
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {
        }

        public DbSet<Fornecedores> Fornecedor { get; set; }
        public DbSet<Produtos> Produto { get; set; }

        public Task SaveChangesAsync(Produtos item)
        {
            throw new NotImplementedException();
        }
    }
}
