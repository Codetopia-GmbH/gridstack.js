/**
 * gridstack-item.component.ts 10.1.0-dev
 * Copyright (c) 2022 Alain Dumesny - see GridStack root license
 */
/**
 * Base interface that all widgets need to implement in order for GridstackItemComponent to correctly save/load/delete/..
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class BaseWidget {
    /**
     * REDEFINE to return an object representing the data needed to re-create yourself, other than `selector` already handled.
     * This should map directly to the @Input() fields of this objects on create, so a simple apply can be used on read
     */
    serialize() { return; }
    /**
     * REDEFINE this if your widget needs to read from saved data and transform it to create itself - you do this for
     * things that are not mapped directly into @Input() fields for example.
     */
    deserialize(w) {
        if (w.input)
            Object.assign(this, w.input);
    }
}
BaseWidget.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BaseWidget, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BaseWidget.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BaseWidget });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BaseWidget, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS13aWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hbmd1bGFyL3Byb2plY3RzL2xpYi9zcmMvbGliL2Jhc2Utd2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVIOztHQUVHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJMUMsTUFBTSxPQUFnQixVQUFVO0lBQy9COzs7T0FHRztJQUNJLFNBQVMsS0FBZ0MsT0FBTyxDQUFDLENBQUM7SUFFekQ7OztPQUdHO0lBQ0ksV0FBVyxDQUFDLENBQW9CO1FBQ3JDLElBQUksQ0FBQyxDQUFDLEtBQUs7WUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7dUdBYm9CLFVBQVU7MkdBQVYsVUFBVTsyRkFBVixVQUFVO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGdyaWRzdGFjay1pdGVtLmNvbXBvbmVudC50cyAxMC4xLjAtZGV2XHJcbiAqIENvcHlyaWdodCAoYykgMjAyMiBBbGFpbiBEdW1lc255IC0gc2VlIEdyaWRTdGFjayByb290IGxpY2Vuc2VcclxuICovXHJcblxyXG4vKipcclxuICogQmFzZSBpbnRlcmZhY2UgdGhhdCBhbGwgd2lkZ2V0cyBuZWVkIHRvIGltcGxlbWVudCBpbiBvcmRlciBmb3IgR3JpZHN0YWNrSXRlbUNvbXBvbmVudCB0byBjb3JyZWN0bHkgc2F2ZS9sb2FkL2RlbGV0ZS8uLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdDb21wSW5wdXRzLCBOZ0dyaWRTdGFja1dpZGdldCB9IGZyb20gJy4vZ3JpZHN0YWNrLmNvbXBvbmVudCc7XHJcblxyXG4gQEluamVjdGFibGUoKVxyXG4gZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VXaWRnZXQge1xyXG4gIC8qKlxyXG4gICAqIFJFREVGSU5FIHRvIHJldHVybiBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBkYXRhIG5lZWRlZCB0byByZS1jcmVhdGUgeW91cnNlbGYsIG90aGVyIHRoYW4gYHNlbGVjdG9yYCBhbHJlYWR5IGhhbmRsZWQuXHJcbiAgICogVGhpcyBzaG91bGQgbWFwIGRpcmVjdGx5IHRvIHRoZSBASW5wdXQoKSBmaWVsZHMgb2YgdGhpcyBvYmplY3RzIG9uIGNyZWF0ZSwgc28gYSBzaW1wbGUgYXBwbHkgY2FuIGJlIHVzZWQgb24gcmVhZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXJpYWxpemUoKTogTmdDb21wSW5wdXRzIHwgdW5kZWZpbmVkICB7IHJldHVybjsgfVxyXG5cclxuICAvKipcclxuICAgKiBSRURFRklORSB0aGlzIGlmIHlvdXIgd2lkZ2V0IG5lZWRzIHRvIHJlYWQgZnJvbSBzYXZlZCBkYXRhIGFuZCB0cmFuc2Zvcm0gaXQgdG8gY3JlYXRlIGl0c2VsZiAtIHlvdSBkbyB0aGlzIGZvclxyXG4gICAqIHRoaW5ncyB0aGF0IGFyZSBub3QgbWFwcGVkIGRpcmVjdGx5IGludG8gQElucHV0KCkgZmllbGRzIGZvciBleGFtcGxlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBkZXNlcmlhbGl6ZSh3OiBOZ0dyaWRTdGFja1dpZGdldCkgIHtcclxuICAgIGlmICh3LmlucHV0KSAgT2JqZWN0LmFzc2lnbih0aGlzLCB3LmlucHV0KTtcclxuICB9XHJcbiB9XHJcbiJdfQ==