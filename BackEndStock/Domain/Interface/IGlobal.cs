using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IGlobal<T>
    {
        Task Create(T item);
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(Guid id);
        Task Update(T item);
        Task Delete(T item);
    }
}
