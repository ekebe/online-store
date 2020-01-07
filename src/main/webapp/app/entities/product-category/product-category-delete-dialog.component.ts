import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';

@Component({
  templateUrl: './product-category-delete-dialog.component.html'
})
export class ProductCategoryDeleteDialogComponent {
  productCategory?: IProductCategory;

  constructor(
    protected productCategoryService: ProductCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productCategoryListModification');
      this.activeModal.close();
    });
  }
}
