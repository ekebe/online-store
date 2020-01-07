import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductCategory, ProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryDetailComponent } from './product-category-detail.component';
import { ProductCategoryUpdateComponent } from './product-category-update.component';

@Injectable({ providedIn: 'root' })
export class ProductCategoryResolve implements Resolve<IProductCategory> {
  constructor(private service: ProductCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productCategory: HttpResponse<ProductCategory>) => {
          if (productCategory.body) {
            return of(productCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductCategory());
  }
}

export const productCategoryRoute: Routes = [
  {
    path: '',
    component: ProductCategoryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductCategoryDetailComponent,
    resolve: {
      productCategory: ProductCategoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductCategoryUpdateComponent,
    resolve: {
      productCategory: ProductCategoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductCategoryUpdateComponent,
    resolve: {
      productCategory: ProductCategoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
