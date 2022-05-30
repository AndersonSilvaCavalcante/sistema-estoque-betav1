using Domain.Interface;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controlers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedorController : ControllerBase
    {
        private readonly IGlobal<Fornecedores> _globalFornecedores;

        public FornecedorController(IGlobal<Fornecedores> globalFornecedores)
        {
            _globalFornecedores = globalFornecedores;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Fornecedores>> GetFornecedorById(Guid id )
        {
            var fonecedor = await _globalFornecedores.GetById(id);
            return Ok(fonecedor);
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Fornecedores>>> GetFornecedores()
        {
            var fonecedores = await _globalFornecedores.GetAll();
            return Ok(fonecedores);
        }

        [HttpPost]
        public async Task<ActionResult> createFornecedores(Fornecedores fornecedor)
        {
            await _globalFornecedores.Create(fornecedor);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateFornecedor(Guid id, Fornecedores item)
        {
            await _globalFornecedores.Update(item);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFornecedor(Guid id)
        {
            var fornecedor = await _globalFornecedores.GetById(id);
            await _globalFornecedores.Delete(fornecedor);
            return Ok();
        }
    }
}
