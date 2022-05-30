using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    [Table("Produtos")]
    public class Produtos
    {
        [Key]
        public Guid Id_Produto { get; set; }

        [Required]
        [StringLength(80)]
        public string Nome { get; set; }

        [Required]
        public int Qtd { get; set; }

        [Required]
        public Guid Id_Fornecedor { get; set; }
        public Fornecedores Fornecedores { get; set; }

    }
}
