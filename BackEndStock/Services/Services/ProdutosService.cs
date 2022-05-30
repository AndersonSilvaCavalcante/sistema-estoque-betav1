using Domain.Interface;
using Domain.Models;
using Infra.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ProdutosService : IGlobal<Produtos>
    {
        private readonly Contexto _contexto;

        public ProdutosService(Contexto contexto)
        {
            _contexto = contexto;
        }

        public async Task Create(Produtos item)
        {
            item.Id_Produto = new Guid();
            _contexto.Produto.Add(item);
            await _contexto.SaveChangesAsync();
        }

        public async Task Delete(Produtos item)
        {
            _contexto.Produto.Remove(item);
            await _contexto.SaveChangesAsync();
        }

        public async Task<IEnumerable<Produtos>> GetAll()
        {
            return await _contexto.Produto.ToListAsync();
        }

        public async Task<Produtos> GetById(Guid id)
        {
            return await _contexto.Produto.FindAsync(id);
        }

        public async Task Update(Produtos item)
        {
            _contexto.Entry(item).State = EntityState.Modified;
            await _contexto.SaveChangesAsync();
        }
    }
}
