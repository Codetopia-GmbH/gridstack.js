/**
 * gridstack-item.component.ts 10.1.0-dev
 * Copyright (c) 2022 Alain Dumesny - see GridStack root license
 */
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * HTML Component Wrapper for gridstack items, in combination with GridstackComponent for parent grid
 */
export class GridstackItemComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.el._gridItemComp = this;
    }
    /** list of options for creating/updating this item */
    set options(val) {
        if (this.el.gridstackNode?.grid) {
            // already built, do an update...
            this.el.gridstackNode.grid.update(this.el, val);
        }
        else {
            // store our custom element in options so we can update it and not re-create a generic div!
            this._options = { ...val, el: this.el };
        }
    }
    /** return the latest grid options (from GS once built, otherwise initial values) */
    get options() {
        return this.el.gridstackNode || this._options || { el: this.el };
    }
    /** return the native element that contains grid specific fields as well */
    get el() { return this.elementRef.nativeElement; }
    /** clears the initial options now that we've built */
    clearOptions() {
        delete this._options;
    }
    ngOnDestroy() {
        delete this.ref;
        delete this.el._gridItemComp;
    }
}
GridstackItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: GridstackItemComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GridstackItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: GridstackItemComponent, selector: "gridstack-item", inputs: { options: "options" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <div class="grid-stack-item-content">
      <!-- where dynamic items go based on component types, or sub-grids, etc...) -->
      <ng-template #container></ng-template>
      <!-- any static (defined in dom) content goes here -->
      <ng-content></ng-content>
      <!-- fallback HTML content from GridStackWidget content field if used instead -->
      {{options.content}}
    </div>`, isInline: true, styles: [":host{display:block}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: GridstackItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gridstack-item', template: `
    <div class="grid-stack-item-content">
      <!-- where dynamic items go based on component types, or sub-grids, etc...) -->
      <ng-template #container></ng-template>
      <!-- any static (defined in dom) content goes here -->
      <ng-content></ng-content>
      <!-- fallback HTML content from GridStackWidget content field if used instead -->
      {{options.content}}
    </div>`, styles: [":host{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], options: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0YWNrLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vYW5ndWxhci9wcm9qZWN0cy9saWIvc3JjL2xpYi9ncmlkc3RhY2staXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUEyQixNQUFNLGVBQWUsQ0FBQzs7QUFTbkg7O0dBRUc7QUFpQkgsTUFBTSxPQUFPLHNCQUFzQjtJQW9DakMsWUFBNkIsVUFBMkM7UUFBM0MsZUFBVSxHQUFWLFVBQVUsQ0FBaUM7UUFDdEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUEzQkQsc0RBQXNEO0lBQ3RELElBQW9CLE9BQU8sQ0FBQyxHQUFrQjtRQUM1QyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRTtZQUMvQixpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDTCwyRkFBMkY7WUFDM0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBQ0Qsb0ZBQW9GO0lBQ3BGLElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksRUFBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBQyxDQUFDO0lBQ2pFLENBQUM7SUFJRCwyRUFBMkU7SUFDM0UsSUFBVyxFQUFFLEtBQThCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRWxGLHNEQUFzRDtJQUMvQyxZQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBTU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDaEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUMvQixDQUFDOzttSEEzQ1Usc0JBQXNCO3VHQUF0QixzQkFBc0IseUtBR0QsZ0JBQWdCLDJDQWpCdEM7Ozs7Ozs7O1dBUUQ7MkZBTUUsc0JBQXNCO2tCQWhCbEMsU0FBUzsrQkFDRSxnQkFBZ0IsWUFDaEI7Ozs7Ozs7O1dBUUQ7aUdBUytELFNBQVM7c0JBQWhGLFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBUzNDLE9BQU87c0JBQTFCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGdyaWRzdGFjay1pdGVtLmNvbXBvbmVudC50cyAxMC4xLjAtZGV2XG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgQWxhaW4gRHVtZXNueSAtIHNlZSBHcmlkU3RhY2sgcm9vdCBsaWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmLCBPbkRlc3Ryb3ksIENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JpZEl0ZW1IVE1MRWxlbWVudCwgR3JpZFN0YWNrTm9kZSB9IGZyb20gJ2dyaWRzdGFjayc7XG5pbXBvcnQgeyBCYXNlV2lkZ2V0IH0gZnJvbSAnLi9iYXNlLXdpZGdldCc7XG5cbi8qKiBzdG9yZSBlbGVtZW50IHRvIE5nIENsYXNzIHBvaW50ZXIgYmFjayAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmlkSXRlbUNvbXBIVE1MRWxlbWVudCBleHRlbmRzIEdyaWRJdGVtSFRNTEVsZW1lbnQge1xuICBfZ3JpZEl0ZW1Db21wPzogR3JpZHN0YWNrSXRlbUNvbXBvbmVudDtcbn1cblxuLyoqXG4gKiBIVE1MIENvbXBvbmVudCBXcmFwcGVyIGZvciBncmlkc3RhY2sgaXRlbXMsIGluIGNvbWJpbmF0aW9uIHdpdGggR3JpZHN0YWNrQ29tcG9uZW50IGZvciBwYXJlbnQgZ3JpZFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncmlkc3RhY2staXRlbScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImdyaWQtc3RhY2staXRlbS1jb250ZW50XCI+XG4gICAgICA8IS0tIHdoZXJlIGR5bmFtaWMgaXRlbXMgZ28gYmFzZWQgb24gY29tcG9uZW50IHR5cGVzLCBvciBzdWItZ3JpZHMsIGV0Yy4uLikgLS0+XG4gICAgICA8bmctdGVtcGxhdGUgI2NvbnRhaW5lcj48L25nLXRlbXBsYXRlPlxuICAgICAgPCEtLSBhbnkgc3RhdGljIChkZWZpbmVkIGluIGRvbSkgY29udGVudCBnb2VzIGhlcmUgLS0+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8IS0tIGZhbGxiYWNrIEhUTUwgY29udGVudCBmcm9tIEdyaWRTdGFja1dpZGdldCBjb250ZW50IGZpZWxkIGlmIHVzZWQgaW5zdGVhZCAtLT5cbiAgICAgIHt7b3B0aW9ucy5jb250ZW50fX1cbiAgICA8L2Rpdj5gLFxuICBzdHlsZXM6IFtgXG4gICAgOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgfVxuICBgXSxcbiAgLy8gY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsIC8vIElGRiB5b3Ugd2FudCB0byBvcHRpbWl6ZSBhbmQgY29udHJvbCB3aGVuIENoYW5nZURldGVjdGlvbiBuZWVkcyB0byBoYXBwZW4uLi5cbn0pXG5leHBvcnQgY2xhc3MgR3JpZHN0YWNrSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgLyoqIGNvbnRhaW5lciB0byBhcHBlbmQgaXRlbXMgZHluYW1pY2FsbHkgKi9cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KSBwdWJsaWMgY29udGFpbmVyPzogVmlld0NvbnRhaW5lclJlZjtcblxuICAvKiogQ29tcG9uZW50UmVmIG9mIG91cnNlbGYgLSB1c2VkIGJ5IGR5bmFtaWMgb2JqZWN0IHRvIGNvcnJlY3RseSBnZXQgcmVtb3ZlZCAqL1xuICBwdWJsaWMgcmVmOiBDb21wb25lbnRSZWY8R3JpZHN0YWNrSXRlbUNvbXBvbmVudD4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqIGNoaWxkIGNvbXBvbmVudCBzbyB3ZSBjYW4gc2F2ZS9yZXN0b3JlIGFkZGl0aW9uYWwgZGF0YSB0byBiZSBzYXZlZCBhbG9uZyAqL1xuICBwdWJsaWMgY2hpbGRXaWRnZXQ6IEJhc2VXaWRnZXQgfCB1bmRlZmluZWQ7XG5cbiAgLyoqIGxpc3Qgb2Ygb3B0aW9ucyBmb3IgY3JlYXRpbmcvdXBkYXRpbmcgdGhpcyBpdGVtICovXG4gIEBJbnB1dCgpIHB1YmxpYyBzZXQgb3B0aW9ucyh2YWw6IEdyaWRTdGFja05vZGUpIHtcbiAgICBpZiAodGhpcy5lbC5ncmlkc3RhY2tOb2RlPy5ncmlkKSB7XG4gICAgICAvLyBhbHJlYWR5IGJ1aWx0LCBkbyBhbiB1cGRhdGUuLi5cbiAgICAgIHRoaXMuZWwuZ3JpZHN0YWNrTm9kZS5ncmlkLnVwZGF0ZSh0aGlzLmVsLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzdG9yZSBvdXIgY3VzdG9tIGVsZW1lbnQgaW4gb3B0aW9ucyBzbyB3ZSBjYW4gdXBkYXRlIGl0IGFuZCBub3QgcmUtY3JlYXRlIGEgZ2VuZXJpYyBkaXYhXG4gICAgICB0aGlzLl9vcHRpb25zID0gey4uLnZhbCwgZWw6IHRoaXMuZWx9O1xuICAgIH1cbiAgfVxuICAvKiogcmV0dXJuIHRoZSBsYXRlc3QgZ3JpZCBvcHRpb25zIChmcm9tIEdTIG9uY2UgYnVpbHQsIG90aGVyd2lzZSBpbml0aWFsIHZhbHVlcykgKi9cbiAgcHVibGljIGdldCBvcHRpb25zKCk6IEdyaWRTdGFja05vZGUge1xuICAgIHJldHVybiB0aGlzLmVsLmdyaWRzdGFja05vZGUgfHwgdGhpcy5fb3B0aW9ucyB8fCB7ZWw6IHRoaXMuZWx9O1xuICB9XG5cbiAgcHJpdmF0ZSBfb3B0aW9ucz86IEdyaWRTdGFja05vZGU7XG5cbiAgLyoqIHJldHVybiB0aGUgbmF0aXZlIGVsZW1lbnQgdGhhdCBjb250YWlucyBncmlkIHNwZWNpZmljIGZpZWxkcyBhcyB3ZWxsICovXG4gIHB1YmxpYyBnZXQgZWwoKTogR3JpZEl0ZW1Db21wSFRNTEVsZW1lbnQgeyByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7IH1cblxuICAvKiogY2xlYXJzIHRoZSBpbml0aWFsIG9wdGlvbnMgbm93IHRoYXQgd2UndmUgYnVpbHQgKi9cbiAgcHVibGljIGNsZWFyT3B0aW9ucygpIHtcbiAgICBkZWxldGUgdGhpcy5fb3B0aW9ucztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZjxHcmlkSXRlbUhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMuZWwuX2dyaWRJdGVtQ29tcCA9IHRoaXM7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMucmVmO1xuICAgIGRlbGV0ZSB0aGlzLmVsLl9ncmlkSXRlbUNvbXA7XG4gIH1cbn1cbiJdfQ==