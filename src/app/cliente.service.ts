import { HttpClient } from '@angular/common/http';
import { Injectable ,inject } from '@angular/core';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient);

  
  lista()
  {
    return this.http.get<Cliente[]>("http://localhost:8080/api/clientes")
  }

  create(cliente: Cliente)
  {
    return this.http.post<Cliente>("http://localhost:8080/api/clientes",cliente)
  }

  get(id: number)
  {
    return this.http.get<Cliente>(`http://localhost:8080/api/clientes/${id}`)
  }

  update(id: number,cliente: Cliente)
  {
    return this.http.put<Cliente>(`http://localhost:8080/api/clientes/${id}`,cliente)
  }

  delete(id: number)
  {
     return this.http.delete(`http://localhost:8080/api/clientes/${id}`)
  }
}
