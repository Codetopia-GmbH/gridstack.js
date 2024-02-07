/**
 * gridstack.component.ts 10.1.0-dev
 * Copyright (c) 2022 Alain Dumesny - see GridStack root license
 */
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { GridStack } from "gridstack";
import { GridstackComponent, gsCreateNgComponents, gsSaveAdditionalNgInfo } from "./gridstack.component";
import { GridstackItemComponent } from "./gridstack-item.component";
import * as i0 from "@angular/core";
export class GridstackModule {
    constructor() {
        // set globally our method to create the right widget type
        GridStack.addRemoveCB = gsCreateNgComponents;
        GridStack.saveCB = gsSaveAdditionalNgInfo;
    }
}
GridstackModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: GridstackModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GridstackModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: GridstackModule, declarations: [GridstackComponent,
        GridstackItemComponent], imports: [CommonModule], exports: [GridstackComponent,
        GridstackItemComponent] });
GridstackModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: GridstackModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: GridstackModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        GridstackComponent,
                        GridstackItemComponent,
                    ],
                    exports: [
                        GridstackComponent,
                        GridstackItemComponent,
                    ],
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0YWNrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FuZ3VsYXIvcHJvamVjdHMvbGliL3NyYy9saWIvZ3JpZHN0YWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQWVwRSxNQUFNLE9BQU8sZUFBZTtJQUMxQjtRQUNFLDBEQUEwRDtRQUMxRCxTQUFTLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDO1FBQzdDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsc0JBQXNCLENBQUM7SUFDNUMsQ0FBQzs7NEdBTFUsZUFBZTs2R0FBZixlQUFlLGlCQVJ4QixrQkFBa0I7UUFDbEIsc0JBQXNCLGFBSnRCLFlBQVksYUFPWixrQkFBa0I7UUFDbEIsc0JBQXNCOzZHQUdiLGVBQWUsWUFYeEIsWUFBWTsyRkFXSCxlQUFlO2tCQWIzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3FCQUNiO29CQUNELFlBQVksRUFBRTt3QkFDWixrQkFBa0I7d0JBQ2xCLHNCQUFzQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGtCQUFrQjt3QkFDbEIsc0JBQXNCO3FCQUN2QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBncmlkc3RhY2suY29tcG9uZW50LnRzIDEwLjEuMC1kZXZcclxuICogQ29weXJpZ2h0IChjKSAyMDIyIEFsYWluIER1bWVzbnkgLSBzZWUgR3JpZFN0YWNrIHJvb3QgbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEdyaWRTdGFjayB9IGZyb20gXCJncmlkc3RhY2tcIjtcclxuaW1wb3J0IHsgR3JpZHN0YWNrQ29tcG9uZW50LCBnc0NyZWF0ZU5nQ29tcG9uZW50cywgZ3NTYXZlQWRkaXRpb25hbE5nSW5mbyB9IGZyb20gXCIuL2dyaWRzdGFjay5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR3JpZHN0YWNrSXRlbUNvbXBvbmVudCB9IGZyb20gXCIuL2dyaWRzdGFjay1pdGVtLmNvbXBvbmVudFwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEdyaWRzdGFja0NvbXBvbmVudCxcclxuICAgIEdyaWRzdGFja0l0ZW1Db21wb25lbnQsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBHcmlkc3RhY2tDb21wb25lbnQsXHJcbiAgICBHcmlkc3RhY2tJdGVtQ29tcG9uZW50LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkc3RhY2tNb2R1bGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gc2V0IGdsb2JhbGx5IG91ciBtZXRob2QgdG8gY3JlYXRlIHRoZSByaWdodCB3aWRnZXQgdHlwZVxyXG4gICAgR3JpZFN0YWNrLmFkZFJlbW92ZUNCID0gZ3NDcmVhdGVOZ0NvbXBvbmVudHM7XHJcbiAgICBHcmlkU3RhY2suc2F2ZUNCID0gZ3NTYXZlQWRkaXRpb25hbE5nSW5mbztcclxuICB9XHJcbn1cclxuIl19