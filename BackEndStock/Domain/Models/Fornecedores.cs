using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace Domain.Models
{
    [Table("Fornecedores")]
    public class Fornecedores
    {
        [Key]
        public Guid Id_Fornecedor { get; set; }

        [Required]
        [StringLength(80)]
        public string Name { get; set; }
    }
}
