using Domain.Interface;
using Domain.Models;
using Infra.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Swevices
{
    public class FornecedorService : IGlobal<Fornecedores>
    {

        private readonly Contexto _contexto;

        public FornecedorService(Contexto contexto)
        {
            _contexto = contexto;
        }

        public async Task Create(Fornecedores item)
        {
            item.Id_Fornecedor = new Guid();
            _contexto.Fornecedor.Add(item);
            await _contexto.SaveChangesAsync();
        }

        public async Task Delete(Fornecedores item)
        {
            _contexto.Fornecedor.Remove(item);
            await _contexto.SaveChangesAsync();
        }

        public async Task<IEnumerable<Fornecedores>> GetAll()
        {
            return await _contexto.Fornecedor.ToListAsync();
        }

        public async Task<Fornecedores> GetById(Guid id)
        {
            var fornecedor = await _contexto.Fornecedor.FindAsync(id);
            return fornecedor;
        }

        public async Task Update(Fornecedores item)
        {
            _contexto.Entry(item).State = EntityState.Modified;
            await _contexto.SaveChangesAsync();
        }
    }
}
