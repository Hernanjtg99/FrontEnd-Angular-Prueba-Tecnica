import { Component, inject } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink, FooterComponent,HeaderComponent],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  private clienteservice = inject(ClienteService)

  clientes: Cliente[];

  listaCompleta()
  {
     this.clienteservice.lista().subscribe(
      clientes => this.clientes = clientes
    )
  }
  

  ngOnInit(): void {
    this.listaCompleta();
  }

 delete(cliente: Cliente)
  {
    this.clienteservice.delete(cliente.id).subscribe();
    location.reload();
  }
}
