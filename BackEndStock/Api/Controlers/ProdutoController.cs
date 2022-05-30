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
    public class ProdutoController : Controller
    {
        private readonly IGlobal<Produtos> _globalProduto;

        public ProdutoController(IGlobal<Produtos> globalProduto)
        {
            _globalProduto = globalProduto;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Produtos>>> GetAllProdutos()
        {
            var produtos = await _globalProduto.GetAll();
            return Ok(produtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Produtos>> GetProdutosById(Guid id)
        {
            var produto = await _globalProduto.GetById(id);
            return Ok(produto);
        }

        [HttpPost]
        public async Task<ActionResult> CreateProduto(Produtos item)
        {
            await _globalProduto.Create(item);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditProduto(Guid id, Produtos item)
        {
            await _globalProduto.Update(item);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduto(Guid id)
        {
            var produto = await _globalProduto.GetById(id);
            await _globalProduto.Delete(produto);
            return Ok();
        }
    }
}
