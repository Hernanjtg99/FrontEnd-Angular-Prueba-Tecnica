import { Component, inject } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../cliente';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink,FooterComponent,HeaderComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  private clienteservice = inject(ClienteService);
  private ruta = inject(Router);
  private formbuilder = inject(FormBuilder);
  private rutaact = inject(ActivatedRoute)

  public clientesave: Cliente = new Cliente;

  formulario? :FormGroup
  cliente?: Cliente


  cargarCliente()
  {
    const id =this.rutaact.snapshot.paramMap.get('id');
    if(id)
      {
       this.clienteservice.get(parseInt(id)).subscribe(cliente => { this.cliente = cliente;
        this.formulario= this.formbuilder.group(
          {
            tipoDocumento:[cliente.tipoDocumento],
            numeroDocumento:[cliente.numeroDocumento],
            apellido:[cliente.apellido],
            ciudad:[cliente.ciudad],
            residencia:[cliente.residencia],
            telefono:[cliente.telefono]
          }
        )   
       })
      }else{
        this.formulario= this.formbuilder.group(
          {
            tipoDocumento:[''],
            numeroDocumento:[''],
            apellido:[''],
            ciudad:[''],
            residencia:[''],
            telefono:['']
          }
        )
      }

  }


  save()
  {
    const valorformulario = this.formulario.value
    if(this.cliente)
      {
        this.clientesave.apellido = valorformulario.apellido;
        this.clientesave.tipoDocumento = valorformulario.tipoDocumento;
        this.clientesave.numeroDocumento = valorformulario.numeroDocumento;
        this.clientesave.ciudad = valorformulario.ciudad;
        this.clientesave.residencia = valorformulario.residencia;
        this.clientesave.telefono = valorformulario.telefono;
  
         this.clienteservice.update(this.cliente.id, this.clientesave).subscribe(()=>
          this.ruta.navigate(['/']))
      }else{
        this.clientesave.apellido = valorformulario.apellido;
        this.clientesave.tipoDocumento = valorformulario.tipoDocumento;
        this.clientesave.numeroDocumento = valorformulario.numeroDocumento;
        this.clientesave.ciudad = valorformulario.ciudad;
        this.clientesave.residencia = valorformulario.residencia;
        this.clientesave.telefono = valorformulario.telefono;

    this.clienteservice.create(this.clientesave).subscribe(()=>
      this.ruta.navigate(['/'])
    );
  }
  }

  ngOnInit(): void {
    this.cargarCliente();
  }
}
