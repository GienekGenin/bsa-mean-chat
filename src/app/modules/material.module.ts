import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
})
export class MaterialModule { }
