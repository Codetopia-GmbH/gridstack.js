/**
 * gridstack.component.ts 10.1.0-dev
 * Copyright (c) 2022 Alain Dumesny - see GridStack root license
 */
import { Component, ContentChildren, EventEmitter, Input, Output, ViewChild, ViewContainerRef, reflectComponentType } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridStack } from 'gridstack';
import { GridstackItemComponent } from './gridstack-item.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * HTML Component Wrapper for gridstack, in combination with GridstackItemComponent for the items
 */
export class GridstackComponent {
    constructor(
    // private readonly zone: NgZone,
    // private readonly cd: ChangeDetectorRef,
    elementRef) {
        this.elementRef = elementRef;
        /** individual list of GridStackEvent callbacks handlers as output
         * otherwise use this.grid.on('name1 name2 name3', callback) to handle multiple at once
         * see https://github.com/gridstack/gridstack.js/blob/master/demo/events.js#L4
         *
         * Note: camel casing and 'CB' added at the end to prevent @angular-eslint/no-output-native
         * eg: 'change' would trigger the raw CustomEvent so use different name.
         */
        this.addedCB = new EventEmitter();
        this.changeCB = new EventEmitter();
        this.disableCB = new EventEmitter();
        this.dragCB = new EventEmitter();
        this.dragStartCB = new EventEmitter();
        this.dragStopCB = new EventEmitter();
        this.droppedCB = new EventEmitter();
        this.enableCB = new EventEmitter();
        this.removedCB = new EventEmitter();
        this.resizeCB = new EventEmitter();
        this.resizeStartCB = new EventEmitter();
        this.resizeStopCB = new EventEmitter();
        this.ngUnsubscribe = new Subject();
        this.el._gridComp = this;
    }
    /** initial options for creation of the grid */
    set options(val) { this._options = val; }
    /** return the current running options */
    get options() { return this._grid?.opts || this._options || {}; }
    /** return the native element that contains grid specific fields as well */
    get el() { return this.elementRef.nativeElement; }
    /** return the GridStack class */
    get grid() { return this._grid; }
    /** add a list of ng Component to be mapped to selector */
    static addComponentToSelectorType(typeList) {
        typeList.forEach(type => GridstackComponent.selectorToType[GridstackComponent.getSelector(type)] = type);
    }
    /** return the ng Component selector */
    static getSelector(type) {
        return reflectComponentType(type).selector;
    }
    ngOnInit() {
        // init ourself before any template children are created since we track them below anyway - no need to double create+update widgets
        this.loaded = !!this.options?.children?.length;
        this._grid = GridStack.init(this._options, this.el);
        delete this._options; // GS has it now
        this.checkEmpty();
    }
    /** wait until after all DOM is ready to init gridstack children (after angular ngFor and sub-components run first) */
    ngAfterContentInit() {
        // track whenever the children list changes and update the layout...
        this.gridstackItems?.changes
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => this.updateAll());
        // ...and do this once at least unless we loaded children already
        if (!this.loaded)
            this.updateAll();
        this.hookEvents(this.grid);
    }
    ngOnDestroy() {
        delete this.ref;
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this.grid?.destroy();
        delete this._grid;
        delete this.el._gridComp;
    }
    /**
     * called when the TEMPLATE list of items changes - get a list of nodes and
     * update the layout accordingly (which will take care of adding/removing items changed by Angular)
     */
    updateAll() {
        if (!this.grid)
            return;
        const layout = [];
        this.gridstackItems?.forEach(item => {
            layout.push(item.options);
            item.clearOptions();
        });
        this.grid.load(layout); // efficient that does diffs only
    }
    /** check if the grid is empty, if so show alternative content */
    checkEmpty() {
        if (!this.grid)
            return;
        const isEmpty = !this.grid.engine.nodes.length;
        if (isEmpty === this.isEmpty)
            return;
        this.isEmpty = isEmpty;
        // this.cd.detectChanges();
    }
    /** get all known events as easy to use Outputs for convenience */
    hookEvents(grid) {
        if (!grid)
            return;
        grid
            .on('added', (event, nodes) => { this.checkEmpty(); this.addedCB.emit({ event, nodes }); })
            .on('change', (event, nodes) => this.changeCB.emit({ event, nodes }))
            .on('disable', (event) => this.disableCB.emit({ event }))
            .on('drag', (event, el) => this.dragCB.emit({ event, el }))
            .on('dragstart', (event, el) => this.dragStartCB.emit({ event, el }))
            .on('dragstop', (event, el) => this.dragStopCB.emit({ event, el }))
            .on('dropped', (event, previousNode, newNode) => this.droppedCB.emit({ event, previousNode, newNode }))
            .on('enable', (event) => this.enableCB.emit({ event }))
            .on('removed', (event, nodes) => { this.checkEmpty(); this.removedCB.emit({ event, nodes }); })
            .on('resize', (event, el) => this.resizeCB.emit({ event, el }))
            .on('resizestart', (event, el) => this.resizeStartCB.emit({ event, el }))
            .on('resizestop', (event, el) => this.resizeStopCB.emit({ event, el }));
    }
}
/**
 * stores the selector -> Type mapping, so we can create items dynamically from a string.
 * Unfortunately Ng doesn't provide public access to that mapping.
 */
GridstackComponent.selectorToType = {};
GridstackComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: GridstackComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GridstackComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: GridstackComponent, selector: "gridstack", inputs: { options: "options", isEmpty: "isEmpty" }, outputs: { addedCB: "addedCB", changeCB: "changeCB", disableCB: "disableCB", dragCB: "dragCB", dragStartCB: "dragStartCB", dragStopCB: "dragStopCB", droppedCB: "droppedCB", enableCB: "enableCB", removedCB: "removedCB", resizeCB: "resizeCB", resizeStartCB: "resizeStartCB", resizeStopCB: "resizeStopCB" }, queries: [{ propertyName: "gridstackItems", predicate: GridstackItemComponent }], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <!-- content to show when when grid is empty, like instructions on how to add widgets -->
    <ng-content select="[empty-content]" *ngIf="isEmpty"></ng-content>
    <!-- where dynamic items go -->
    <ng-template #container></ng-template>
    <!-- where template items go -->
    <ng-content></ng-content>
  `, isInline: true, styles: [":host{display:block}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: GridstackComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gridstack', template: `
    <!-- content to show when when grid is empty, like instructions on how to add widgets -->
    <ng-content select="[empty-content]" *ngIf="isEmpty"></ng-content>
    <!-- where dynamic items go -->
    <ng-template #container></ng-template>
    <!-- where template items go -->
    <ng-content></ng-content>
  `, styles: [":host{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { gridstackItems: [{
                type: ContentChildren,
                args: [GridstackItemComponent]
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], options: [{
                type: Input
            }], isEmpty: [{
                type: Input
            }], addedCB: [{
                type: Output
            }], changeCB: [{
                type: Output
            }], disableCB: [{
                type: Output
            }], dragCB: [{
                type: Output
            }], dragStartCB: [{
                type: Output
            }], dragStopCB: [{
                type: Output
            }], droppedCB: [{
                type: Output
            }], enableCB: [{
                type: Output
            }], removedCB: [{
                type: Output
            }], resizeCB: [{
                type: Output
            }], resizeStartCB: [{
                type: Output
            }], resizeStopCB: [{
                type: Output
            }] } });
/**
 * can be used when a new item needs to be created, which we do as a Angular component, or deleted (skip)
 **/
export function gsCreateNgComponents(host, w, add, isGrid) {
    if (add) {
        //
        // create the component dynamically - see https://angular.io/docs/ts/latest/cookbook/dynamic-component-loader.html
        //
        if (!host)
            return;
        if (isGrid) {
            const container = host.parentElement?._gridItemComp?.container;
            // TODO: figure out how to create ng component inside regular Div. need to access app injectors...
            // if (!container) {
            //   const hostElement: Element = host;
            //   const environmentInjector: EnvironmentInjector;
            //   grid = createComponent(GridstackComponent, {environmentInjector, hostElement})?.instance;
            // }
            const gridRef = container?.createComponent(GridstackComponent);
            const grid = gridRef?.instance;
            if (!grid)
                return;
            grid.ref = gridRef;
            grid.options = w;
            return grid.el;
        }
        else {
            const gridComp = host._gridComp;
            const gridItemRef = gridComp?.container?.createComponent(GridstackItemComponent);
            const gridItem = gridItemRef?.instance;
            if (!gridItem)
                return;
            gridItem.ref = gridItemRef;
            // IFF we're not a subGrid, define what type of component to create as child, OR you can do it GridstackItemComponent template, but this is more generic
            const selector = w.selector;
            const type = selector ? GridstackComponent.selectorToType[selector] : undefined;
            if (!w.subGridOpts && type) {
                const childWidget = gridItem.container?.createComponent(type)?.instance;
                if (typeof childWidget?.serialize === 'function' && typeof childWidget?.deserialize === 'function') {
                    // proper BaseWidget subclass, save it and load additional data
                    gridItem.childWidget = childWidget;
                    childWidget.deserialize(w);
                }
            }
            return gridItem.el;
        }
    }
    else {
        //
        // REMOVE - have to call ComponentRef:destroy() for dynamic objects to correctly remove themselves
        // Note: this will destroy all children dynamic components as well: gridItem -> childWidget
        //
        const n = w;
        if (isGrid) {
            const grid = n.el?._gridComp;
            if (grid?.ref)
                grid.ref.destroy();
            else
                grid?.ngOnDestroy();
        }
        else {
            const gridItem = n.el?._gridItemComp;
            if (gridItem?.ref)
                gridItem.ref.destroy();
            else
                gridItem?.ngOnDestroy();
        }
    }
    return;
}
/**
 * called for each item in the grid - check if additional information needs to be saved.
 * Note: since this is options minus gridstack private members using Utils.removeInternalForSave(),
 * this typically doesn't need to do anything. However your custom Component @Input() are now supported
 * using BaseWidget.serialize()
 */
export function gsSaveAdditionalNgInfo(n, w) {
    const gridItem = n.el?._gridItemComp;
    if (gridItem) {
        const input = gridItem.childWidget?.serialize();
        if (input) {
            w.input = input;
        }
        return;
    }
    // else check if Grid
    const grid = n.el?._gridComp;
    if (grid) {
        //.... save any custom data
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0YWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FuZ3VsYXIvcHJvamVjdHMvbGliL3NyYy9saWIvZ3JpZHN0YWNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFDakUsTUFBTSxFQUFtQixTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ3JJLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBd0MsU0FBUyxFQUFvRCxNQUFNLFdBQVcsQ0FBQztBQUU5SCxPQUFPLEVBQTJCLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7OztBQWdDN0Y7O0dBRUc7QUFnQkgsTUFBTSxPQUFPLGtCQUFrQjtJQStEN0I7SUFDRSxpQ0FBaUM7SUFDakMsMENBQTBDO0lBQ3pCLFVBQTJDO1FBQTNDLGVBQVUsR0FBVixVQUFVLENBQWlDO1FBbkQ5RDs7Ozs7O1dBTUc7UUFDYyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN2QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN4QyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUN2QyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFDNUMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFDM0MsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFDMUMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdkMsY0FBUyxHQUFHLElBQUks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QUtHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLENBQWtCLEVBQUUsQ0FBb0I7SUFDN0UsTUFBTSxRQUFRLEdBQUksQ0FBQyxDQUFDLEVBQThCLEVBQUUsYUFBYSxDQUFDO0lBQ2xFLElBQUksUUFBUSxFQUFFO1FBQ1osTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsQ0FBQztRQUNoRCxJQUFJLEtBQUssRUFBRTtZQUNULENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ2pCO1FBQ0QsT0FBTztLQUNSO0lBQ0QscUJBQXFCO0lBQ3JCLE1BQU0sSUFBSSxHQUFJLENBQUMsQ0FBQyxFQUEwQixFQUFFLFNBQVMsQ0FBQztJQUN0RCxJQUFJLElBQUksRUFBRTtRQUNSLDJCQUEyQjtLQUM1QjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGdyaWRzdGFjay5jb21wb25lbnQudHMgMTAuMS4wLWRldlxuICogQ29weXJpZ2h0IChjKSAyMDIyIEFsYWluIER1bWVzbnkgLSBzZWUgR3JpZFN0YWNrIHJvb3QgbGljZW5zZVxuICovXG5cbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LFxuICBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFR5cGUsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgcmVmbGVjdENvbXBvbmVudFR5cGUsIENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgR3JpZEhUTUxFbGVtZW50LCBHcmlkSXRlbUhUTUxFbGVtZW50LCBHcmlkU3RhY2ssIEdyaWRTdGFja05vZGUsIEdyaWRTdGFja09wdGlvbnMsIEdyaWRTdGFja1dpZGdldCB9IGZyb20gJ2dyaWRzdGFjayc7XG5cbmltcG9ydCB7IEdyaWRJdGVtQ29tcEhUTUxFbGVtZW50LCBHcmlkc3RhY2tJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkc3RhY2staXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFzZVdpZGdldCB9IGZyb20gJy4vYmFzZS13aWRnZXQnO1xuXG4vKiogZXZlbnRzIGhhbmRsZXJzIGVtaXR0ZXJzIHNpZ25hdHVyZSBmb3IgZGlmZmVyZW50IGV2ZW50cyAqL1xuZXhwb3J0IHR5cGUgZXZlbnRDQiA9IHtldmVudDogRXZlbnR9O1xuZXhwb3J0IHR5cGUgZWxlbWVudENCID0ge2V2ZW50OiBFdmVudCwgZWw6IEdyaWRJdGVtSFRNTEVsZW1lbnR9O1xuZXhwb3J0IHR5cGUgbm9kZXNDQiA9IHtldmVudDogRXZlbnQsIG5vZGVzOiBHcmlkU3RhY2tOb2RlW119O1xuZXhwb3J0IHR5cGUgZHJvcHBlZENCID0ge2V2ZW50OiBFdmVudCwgcHJldmlvdXNOb2RlOiBHcmlkU3RhY2tOb2RlLCBuZXdOb2RlOiBHcmlkU3RhY2tOb2RlfTtcblxuZXhwb3J0IHR5cGUgTmdDb21wSW5wdXRzID0ge1trZXk6IHN0cmluZ106IGFueX07XG5cbi8qKiBleHRlbmRzIHRvIHN0b3JlIE5nIENvbXBvbmVudCBzZWxlY3RvciwgaW5zdGVhZC9pbkFkZGl0aW9uIHRvIGNvbnRlbnQgKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdHcmlkU3RhY2tXaWRnZXQgZXh0ZW5kcyBHcmlkU3RhY2tXaWRnZXQge1xuICBzZWxlY3Rvcj86IHN0cmluZzsgLy8gY29tcG9uZW50IHR5cGUgdG8gY3JlYXRlIGFzIGNvbnRlbnRcbiAgaW5wdXQ/OiBOZ0NvbXBJbnB1dHM7IC8vIHNlcmlhbGl6ZWQgZGF0YSBmb3IgdGhlIGNvbXBvbmVudCBpbnB1dCBmaWVsZHNcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTmdHcmlkU3RhY2tOb2RlIGV4dGVuZHMgR3JpZFN0YWNrTm9kZSB7XG4gIHNlbGVjdG9yPzogc3RyaW5nOyAvLyBjb21wb25lbnQgdHlwZSB0byBjcmVhdGUgYXMgY29udGVudFxufVxuZXhwb3J0IGludGVyZmFjZSBOZ0dyaWRTdGFja09wdGlvbnMgZXh0ZW5kcyBHcmlkU3RhY2tPcHRpb25zIHtcbiAgY2hpbGRyZW4/OiBOZ0dyaWRTdGFja1dpZGdldFtdO1xuICBzdWJHcmlkT3B0cz86IE5nR3JpZFN0YWNrT3B0aW9ucztcbn1cblxuLyoqIHN0b3JlIGVsZW1lbnQgdG8gTmcgQ2xhc3MgcG9pbnRlciBiYWNrICovXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDb21wSFRNTEVsZW1lbnQgZXh0ZW5kcyBHcmlkSFRNTEVsZW1lbnQge1xuICBfZ3JpZENvbXA/OiBHcmlkc3RhY2tDb21wb25lbnQ7XG59XG5cbi8qKiBzZWxlY3RvciBzdHJpbmcgdG8gcnVudGltZSBUeXBlIG1hcHBpbmcgKi9cbmV4cG9ydCB0eXBlIFNlbGVjdG9yVG9UeXBlID0ge1trZXk6IHN0cmluZ106IFR5cGU8T2JqZWN0Pn07XG5cbi8qKlxuICogSFRNTCBDb21wb25lbnQgV3JhcHBlciBmb3IgZ3JpZHN0YWNrLCBpbiBjb21iaW5hdGlvbiB3aXRoIEdyaWRzdGFja0l0ZW1Db21wb25lbnQgZm9yIHRoZSBpdGVtc1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncmlkc3RhY2snLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gY29udGVudCB0byBzaG93IHdoZW4gd2hlbiBncmlkIGlzIGVtcHR5LCBsaWtlIGluc3RydWN0aW9ucyBvbiBob3cgdG8gYWRkIHdpZGdldHMgLS0+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2VtcHR5LWNvbnRlbnRdXCIgKm5nSWY9XCJpc0VtcHR5XCI+PC9uZy1jb250ZW50PlxuICAgIDwhLS0gd2hlcmUgZHluYW1pYyBpdGVtcyBnbyAtLT5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRhaW5lcj48L25nLXRlbXBsYXRlPlxuICAgIDwhLS0gd2hlcmUgdGVtcGxhdGUgaXRlbXMgZ28gLS0+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxuICBzdHlsZXM6IFtgXG4gICAgOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgfVxuICBgXSxcbiAgLy8gY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsIC8vIElGRiB5b3Ugd2FudCB0byBvcHRpbWl6ZSBhbmQgY29udHJvbCB3aGVuIENoYW5nZURldGVjdGlvbiBuZWVkcyB0byBoYXBwZW4uLi5cbn0pXG5leHBvcnQgY2xhc3MgR3JpZHN0YWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8qKiB0cmFjayBsaXN0IG9mIFRFTVBMQVRFIGdyaWQgaXRlbXMgc28gd2UgY2FuIHN5bmMgYmV0d2VlbiBET00gYW5kIEdTIGludGVybmFscyAqL1xuICBAQ29udGVudENoaWxkcmVuKEdyaWRzdGFja0l0ZW1Db21wb25lbnQpIHB1YmxpYyBncmlkc3RhY2tJdGVtcz86IFF1ZXJ5TGlzdDxHcmlkc3RhY2tJdGVtQ29tcG9uZW50PjtcbiAgLyoqIGNvbnRhaW5lciB0byBhcHBlbmQgaXRlbXMgZHluYW1pY2FsbHkgKi9cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KSBwdWJsaWMgY29udGFpbmVyPzogVmlld0NvbnRhaW5lclJlZjtcblxuICAvKiogaW5pdGlhbCBvcHRpb25zIGZvciBjcmVhdGlvbiBvZiB0aGUgZ3JpZCAqL1xuICBASW5wdXQoKSBwdWJsaWMgc2V0IG9wdGlvbnModmFsOiBHcmlkU3RhY2tPcHRpb25zKSB7IHRoaXMuX29wdGlvbnMgPSB2YWw7IH1cbiAgLyoqIHJldHVybiB0aGUgY3VycmVudCBydW5uaW5nIG9wdGlvbnMgKi9cbiAgcHVibGljIGdldCBvcHRpb25zKCk6IEdyaWRTdGFja09wdGlvbnMgeyByZXR1cm4gdGhpcy5fZ3JpZD8ub3B0cyB8fCB0aGlzLl9vcHRpb25zIHx8IHt9OyB9XG5cbiAgLyoqIHRydWUgd2hpbGUgbmctY29udGVudCB3aXRoICduby1pdGVtLWNvbnRlbnQnIHNob3VsZCBiZSBzaG93biB3aGVuIGxhc3QgaXRlbSBpcyByZW1vdmVkIGZyb20gYSBncmlkICovXG4gIEBJbnB1dCgpIHB1YmxpYyBpc0VtcHR5PzogYm9vbGVhbjtcblxuICAvKiogaW5kaXZpZHVhbCBsaXN0IG9mIEdyaWRTdGFja0V2ZW50IGNhbGxiYWNrcyBoYW5kbGVycyBhcyBvdXRwdXRcbiAgICogb3RoZXJ3aXNlIHVzZSB0aGlzLmdyaWQub24oJ25hbWUxIG5hbWUyIG5hbWUzJywgY2FsbGJhY2spIHRvIGhhbmRsZSBtdWx0aXBsZSBhdCBvbmNlXG4gICAqIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3JpZHN0YWNrL2dyaWRzdGFjay5qcy9ibG9iL21hc3Rlci9kZW1vL2V2ZW50cy5qcyNMNFxuICAgKlxuICAgKiBOb3RlOiBjYW1lbCBjYXNpbmcgYW5kICdDQicgYWRkZWQgYXQgdGhlIGVuZCB0byBwcmV2ZW50IEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gICAqIGVnOiAnY2hhbmdlJyB3b3VsZCB0cmlnZ2VyIHRoZSByYXcgQ3VzdG9tRXZlbnQgc28gdXNlIGRpZmZlcmVudCBuYW1lLlxuICAgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyBhZGRlZENCID0gbmV3IEV2ZW50RW1pdHRlcjxub2Rlc0NCPigpO1xuICBAT3V0cHV0KCkgcHVibGljIGNoYW5nZUNCID0gbmV3IEV2ZW50RW1pdHRlcjxub2Rlc0NCPigpO1xuICBAT3V0cHV0KCkgcHVibGljIGRpc2FibGVDQiA9IG5ldyBFdmVudEVtaXR0ZXI8ZXZlbnRDQj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBkcmFnQ0IgPSBuZXcgRXZlbnRFbWl0dGVyPGVsZW1lbnRDQj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBkcmFnU3RhcnRDQiA9IG5ldyBFdmVudEVtaXR0ZXI8ZWxlbWVudENCPigpO1xuICBAT3V0cHV0KCkgcHVibGljIGRyYWdTdG9wQ0IgPSBuZXcgRXZlbnRFbWl0dGVyPGVsZW1lbnRDQj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBkcm9wcGVkQ0IgPSBuZXcgRXZlbnRFbWl0dGVyPGRyb3BwZWRDQj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBlbmFibGVDQiA9IG5ldyBFdmVudEVtaXR0ZXI8ZXZlbnRDQj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyByZW1vdmVkQ0IgPSBuZXcgRXZlbnRFbWl0dGVyPG5vZGVzQ0I+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcmVzaXplQ0IgPSBuZXcgRXZlbnRFbWl0dGVyPGVsZW1lbnRDQj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyByZXNpemVTdGFydENCID0gbmV3IEV2ZW50RW1pdHRlcjxlbGVtZW50Q0I+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcmVzaXplU3RvcENCID0gbmV3IEV2ZW50RW1pdHRlcjxlbGVtZW50Q0I+KCk7XG5cbiAgLyoqIHJldHVybiB0aGUgbmF0aXZlIGVsZW1lbnQgdGhhdCBjb250YWlucyBncmlkIHNwZWNpZmljIGZpZWxkcyBhcyB3ZWxsICovXG4gIHB1YmxpYyBnZXQgZWwoKTogR3JpZENvbXBIVE1MRWxlbWVudCB7IHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDsgfVxuXG4gIC8qKiByZXR1cm4gdGhlIEdyaWRTdGFjayBjbGFzcyAqL1xuICBwdWJsaWMgZ2V0IGdyaWQoKTogR3JpZFN0YWNrIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX2dyaWQ7IH1cblxuICAvKiogQ29tcG9uZW50UmVmIG9mIG91cnNlbGYgLSB1c2VkIGJ5IGR5bmFtaWMgb2JqZWN0IHRvIGNvcnJlY3RseSBnZXQgcmVtb3ZlZCAqL1xuICBwdWJsaWMgcmVmOiBDb21wb25lbnRSZWY8R3JpZHN0YWNrQ29tcG9uZW50PiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSBzZWxlY3RvciAtPiBUeXBlIG1hcHBpbmcsIHNvIHdlIGNhbiBjcmVhdGUgaXRlbXMgZHluYW1pY2FsbHkgZnJvbSBhIHN0cmluZy5cbiAgICogVW5mb3J0dW5hdGVseSBOZyBkb2Vzbid0IHByb3ZpZGUgcHVibGljIGFjY2VzcyB0byB0aGF0IG1hcHBpbmcuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNlbGVjdG9yVG9UeXBlOiBTZWxlY3RvclRvVHlwZSA9IHt9O1xuICAvKiogYWRkIGEgbGlzdCBvZiBuZyBDb21wb25lbnQgdG8gYmUgbWFwcGVkIHRvIHNlbGVjdG9yICovXG4gIHB1YmxpYyBzdGF0aWMgYWRkQ29tcG9uZW50VG9TZWxlY3RvclR5cGUodHlwZUxpc3Q6IEFycmF5PFR5cGU8T2JqZWN0Pj4pIHtcbiAgICB0eXBlTGlzdC5mb3JFYWNoKHR5cGUgPT4gR3JpZHN0YWNrQ29tcG9uZW50LnNlbGVjdG9yVG9UeXBlWyBHcmlkc3RhY2tDb21wb25lbnQuZ2V0U2VsZWN0b3IodHlwZSkgXSA9IHR5cGUpO1xuICB9XG4gIC8qKiByZXR1cm4gdGhlIG5nIENvbXBvbmVudCBzZWxlY3RvciAqL1xuICBwdWJsaWMgc3RhdGljIGdldFNlbGVjdG9yKHR5cGU6IFR5cGU8T2JqZWN0Pik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHJlZmxlY3RDb21wb25lbnRUeXBlKHR5cGUpIS5zZWxlY3RvcjtcbiAgfVxuXG4gIHByaXZhdGUgX29wdGlvbnM/OiBHcmlkU3RhY2tPcHRpb25zO1xuICBwcml2YXRlIF9ncmlkPzogR3JpZFN0YWNrO1xuICBwcml2YXRlIGxvYWRlZD86IGJvb2xlYW47XG4gIHByaXZhdGUgbmdVbnN1YnNjcmliZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy8gcHJpdmF0ZSByZWFkb25seSB6b25lOiBOZ1pvbmUsXG4gICAgLy8gcHJpdmF0ZSByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEdyaWRDb21wSFRNTEVsZW1lbnQ+LFxuICApIHtcbiAgICB0aGlzLmVsLl9ncmlkQ29tcCA9IHRoaXM7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gaW5pdCBvdXJzZWxmIGJlZm9yZSBhbnkgdGVtcGxhdGUgY2hpbGRyZW4gYXJlIGNyZWF0ZWQgc2luY2Ugd2UgdHJhY2sgdGhlbSBiZWxvdyBhbnl3YXkgLSBubyBuZWVkIHRvIGRvdWJsZSBjcmVhdGUrdXBkYXRlIHdpZGdldHNcbiAgICB0aGlzLmxvYWRlZCA9ICEhdGhpcy5vcHRpb25zPy5jaGlsZHJlbj8ubGVuZ3RoO1xuICAgIHRoaXMuX2dyaWQgPSBHcmlkU3RhY2suaW5pdCh0aGlzLl9vcHRpb25zLCB0aGlzLmVsKTtcbiAgICBkZWxldGUgdGhpcy5fb3B0aW9uczsgLy8gR1MgaGFzIGl0IG5vd1xuXG4gICAgdGhpcy5jaGVja0VtcHR5KCk7XG4gIH1cblxuICAvKiogd2FpdCB1bnRpbCBhZnRlciBhbGwgRE9NIGlzIHJlYWR5IHRvIGluaXQgZ3JpZHN0YWNrIGNoaWxkcmVuIChhZnRlciBhbmd1bGFyIG5nRm9yIGFuZCBzdWItY29tcG9uZW50cyBydW4gZmlyc3QpICovXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gdHJhY2sgd2hlbmV2ZXIgdGhlIGNoaWxkcmVuIGxpc3QgY2hhbmdlcyBhbmQgdXBkYXRlIHRoZSBsYXlvdXQuLi5cbiAgICB0aGlzLmdyaWRzdGFja0l0ZW1zPy5jaGFuZ2VzXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5uZ1Vuc3Vic2NyaWJlKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVBbGwoKSk7XG4gICAgLy8gLi4uYW5kIGRvIHRoaXMgb25jZSBhdCBsZWFzdCB1bmxlc3Mgd2UgbG9hZGVkIGNoaWxkcmVuIGFscmVhZHlcbiAgICBpZiAoIXRoaXMubG9hZGVkKSB0aGlzLnVwZGF0ZUFsbCgpO1xuICAgIHRoaXMuaG9va0V2ZW50cyh0aGlzLmdyaWQpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLnJlZjtcbiAgICB0aGlzLm5nVW5zdWJzY3JpYmUubmV4dCgpO1xuICAgIHRoaXMubmdVbnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZ3JpZD8uZGVzdHJveSgpO1xuICAgIGRlbGV0ZSB0aGlzLl9ncmlkO1xuICAgIGRlbGV0ZSB0aGlzLmVsLl9ncmlkQ29tcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsZWQgd2hlbiB0aGUgVEVNUExBVEUgbGlzdCBvZiBpdGVtcyBjaGFuZ2VzIC0gZ2V0IGEgbGlzdCBvZiBub2RlcyBhbmRcbiAgICogdXBkYXRlIHRoZSBsYXlvdXQgYWNjb3JkaW5nbHkgKHdoaWNoIHdpbGwgdGFrZSBjYXJlIG9mIGFkZGluZy9yZW1vdmluZyBpdGVtcyBjaGFuZ2VkIGJ5IEFuZ3VsYXIpXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQWxsKCkge1xuICAgIGlmICghdGhpcy5ncmlkKSByZXR1cm47XG4gICAgY29uc3QgbGF5b3V0OiBHcmlkU3RhY2tXaWRnZXRbXSA9IFtdO1xuICAgIHRoaXMuZ3JpZHN0YWNrSXRlbXM/LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBsYXlvdXQucHVzaChpdGVtLm9wdGlvbnMpO1xuICAgICAgaXRlbS5jbGVhck9wdGlvbnMoKTtcbiAgICB9KTtcbiAgICB0aGlzLmdyaWQubG9hZChsYXlvdXQpOyAvLyBlZmZpY2llbnQgdGhhdCBkb2VzIGRpZmZzIG9ubHlcbiAgfVxuXG4gIC8qKiBjaGVjayBpZiB0aGUgZ3JpZCBpcyBlbXB0eSwgaWYgc28gc2hvdyBhbHRlcm5hdGl2ZSBjb250ZW50ICovXG4gIHB1YmxpYyBjaGVja0VtcHR5KCkge1xuICAgIGlmICghdGhpcy5ncmlkKSByZXR1cm47XG4gICAgY29uc3QgaXNFbXB0eSA9ICF0aGlzLmdyaWQuZW5naW5lLm5vZGVzLmxlbmd0aDtcbiAgICBpZiAoaXNFbXB0eSA9PT0gdGhpcy5pc0VtcHR5KSByZXR1cm47XG4gICAgdGhpcy5pc0VtcHR5ID0gaXNFbXB0eTtcbiAgICAvLyB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKiBnZXQgYWxsIGtub3duIGV2ZW50cyBhcyBlYXN5IHRvIHVzZSBPdXRwdXRzIGZvciBjb252ZW5pZW5jZSAqL1xuICBwcml2YXRlIGhvb2tFdmVudHMoZ3JpZD86IEdyaWRTdGFjaykge1xuICAgIGlmICghZ3JpZCkgcmV0dXJuO1xuICAgIGdyaWRcbiAgICAub24oJ2FkZGVkJywgKGV2ZW50OiBFdmVudCwgbm9kZXM6IEdyaWRTdGFja05vZGVbXSkgPT4geyB0aGlzLmNoZWNrRW1wdHkoKTsgdGhpcy5hZGRlZENCLmVtaXQoe2V2ZW50LCBub2Rlc30pOyB9KVxuICAgIC5vbignY2hhbmdlJywgKGV2ZW50OiBFdmVudCwgbm9kZXM6IEdyaWRTdGFja05vZGVbXSkgPT4gdGhpcy5jaGFuZ2VDQi5lbWl0KHtldmVudCwgbm9kZXN9KSlcbiAgICAub24oJ2Rpc2FibGUnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLmRpc2FibGVDQi5lbWl0KHtldmVudH0pKVxuICAgIC5vbignZHJhZycsIChldmVudDogRXZlbnQsIGVsOiBHcmlkSXRlbUhUTUxFbGVtZW50KSA9PiB0aGlzLmRyYWdDQi5lbWl0KHtldmVudCwgZWx9KSlcbiAgICAub24oJ2RyYWdzdGFydCcsIChldmVudDogRXZlbnQsIGVsOiBHcmlkSXRlbUhUTUxFbGVtZW50KSA9PiB0aGlzLmRyYWdTdGFydENCLmVtaXQoe2V2ZW50LCBlbH0pKVxuICAgIC5vbignZHJhZ3N0b3AnLCAoZXZlbnQ6IEV2ZW50LCBlbDogR3JpZEl0ZW1IVE1MRWxlbWVudCkgPT4gdGhpcy5kcmFnU3RvcENCLmVtaXQoe2V2ZW50LCBlbH0pKVxuICAgIC5vbignZHJvcHBlZCcsIChldmVudDogRXZlbnQsIHByZXZpb3VzTm9kZTogR3JpZFN0YWNrTm9kZSwgbmV3Tm9kZTogR3JpZFN0YWNrTm9kZSkgPT4gdGhpcy5kcm9wcGVkQ0IuZW1pdCh7ZXZlbnQsIHByZXZpb3VzTm9kZSwgbmV3Tm9kZX0pKVxuICAgIC5vbignZW5hYmxlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5lbmFibGVDQi5lbWl0KHtldmVudH0pKVxuICAgIC5vbigncmVtb3ZlZCcsIChldmVudDogRXZlbnQsIG5vZGVzOiBHcmlkU3RhY2tOb2RlW10pID0+IHsgdGhpcy5jaGVja0VtcHR5KCk7IHRoaXMucmVtb3ZlZENCLmVtaXQoe2V2ZW50LCBub2Rlc30pOyB9KVxuICAgIC5vbigncmVzaXplJywgKGV2ZW50OiBFdmVudCwgZWw6IEdyaWRJdGVtSFRNTEVsZW1lbnQpID0+IHRoaXMucmVzaXplQ0IuZW1pdCh7ZXZlbnQsIGVsfSkpXG4gICAgLm9uKCdyZXNpemVzdGFydCcsIChldmVudDogRXZlbnQsIGVsOiBHcmlkSXRlbUhUTUxFbGVtZW50KSA9PiB0aGlzLnJlc2l6ZVN0YXJ0Q0IuZW1pdCh7ZXZlbnQsIGVsfSkpXG4gICAgLm9uKCdyZXNpemVzdG9wJywgKGV2ZW50OiBFdmVudCwgZWw6IEdyaWRJdGVtSFRNTEVsZW1lbnQpID0+IHRoaXMucmVzaXplU3RvcENCLmVtaXQoe2V2ZW50LCBlbH0pKVxuICB9XG59XG5cbi8qKlxuICogY2FuIGJlIHVzZWQgd2hlbiBhIG5ldyBpdGVtIG5lZWRzIHRvIGJlIGNyZWF0ZWQsIHdoaWNoIHdlIGRvIGFzIGEgQW5ndWxhciBjb21wb25lbnQsIG9yIGRlbGV0ZWQgKHNraXApXG4gKiovXG5leHBvcnQgZnVuY3Rpb24gZ3NDcmVhdGVOZ0NvbXBvbmVudHMoaG9zdDogR3JpZENvbXBIVE1MRWxlbWVudCB8IEhUTUxFbGVtZW50LCB3OiBOZ0dyaWRTdGFja1dpZGdldCB8IEdyaWRTdGFja05vZGUsIGFkZDogYm9vbGVhbiwgaXNHcmlkOiBib29sZWFuKTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICBpZiAoYWRkKSB7XG4gICAgLy9cbiAgICAvLyBjcmVhdGUgdGhlIGNvbXBvbmVudCBkeW5hbWljYWxseSAtIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZG9jcy90cy9sYXRlc3QvY29va2Jvb2svZHluYW1pYy1jb21wb25lbnQtbG9hZGVyLmh0bWxcbiAgICAvL1xuICAgIGlmICghaG9zdCkgcmV0dXJuO1xuICAgIGlmIChpc0dyaWQpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IChob3N0LnBhcmVudEVsZW1lbnQgYXMgR3JpZEl0ZW1Db21wSFRNTEVsZW1lbnQpPy5fZ3JpZEl0ZW1Db21wPy5jb250YWluZXI7XG4gICAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGhvdyB0byBjcmVhdGUgbmcgY29tcG9uZW50IGluc2lkZSByZWd1bGFyIERpdi4gbmVlZCB0byBhY2Nlc3MgYXBwIGluamVjdG9ycy4uLlxuICAgICAgLy8gaWYgKCFjb250YWluZXIpIHtcbiAgICAgIC8vICAgY29uc3QgaG9zdEVsZW1lbnQ6IEVsZW1lbnQgPSBob3N0O1xuICAgICAgLy8gICBjb25zdCBlbnZpcm9ubWVudEluamVjdG9yOiBFbnZpcm9ubWVudEluamVjdG9yO1xuICAgICAgLy8gICBncmlkID0gY3JlYXRlQ29tcG9uZW50KEdyaWRzdGFja0NvbXBvbmVudCwge2Vudmlyb25tZW50SW5qZWN0b3IsIGhvc3RFbGVtZW50fSk/Lmluc3RhbmNlO1xuICAgICAgLy8gfVxuICAgICAgY29uc3QgZ3JpZFJlZiA9IGNvbnRhaW5lcj8uY3JlYXRlQ29tcG9uZW50KEdyaWRzdGFja0NvbXBvbmVudCk7XG4gICAgICBjb25zdCBncmlkID0gZ3JpZFJlZj8uaW5zdGFuY2U7XG4gICAgICBpZiAoIWdyaWQpIHJldHVybjtcbiAgICAgIGdyaWQucmVmID0gZ3JpZFJlZjtcbiAgICAgIGdyaWQub3B0aW9ucyA9IHcgYXMgR3JpZFN0YWNrT3B0aW9ucztcbiAgICAgIHJldHVybiBncmlkLmVsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBncmlkQ29tcCA9IChob3N0IGFzIEdyaWRDb21wSFRNTEVsZW1lbnQpLl9ncmlkQ29tcDtcbiAgICAgIGNvbnN0IGdyaWRJdGVtUmVmID0gZ3JpZENvbXA/LmNvbnRhaW5lcj8uY3JlYXRlQ29tcG9uZW50KEdyaWRzdGFja0l0ZW1Db21wb25lbnQpO1xuICAgICAgY29uc3QgZ3JpZEl0ZW0gPSBncmlkSXRlbVJlZj8uaW5zdGFuY2U7XG4gICAgICBpZiAoIWdyaWRJdGVtKSByZXR1cm47XG4gICAgICBncmlkSXRlbS5yZWYgPSBncmlkSXRlbVJlZlxuXG4gICAgICAvLyBJRkYgd2UncmUgbm90IGEgc3ViR3JpZCwgZGVmaW5lIHdoYXQgdHlwZSBvZiBjb21wb25lbnQgdG8gY3JlYXRlIGFzIGNoaWxkLCBPUiB5b3UgY2FuIGRvIGl0IEdyaWRzdGFja0l0ZW1Db21wb25lbnQgdGVtcGxhdGUsIGJ1dCB0aGlzIGlzIG1vcmUgZ2VuZXJpY1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSAodyBhcyBOZ0dyaWRTdGFja1dpZGdldCkuc2VsZWN0b3I7XG4gICAgICBjb25zdCB0eXBlID0gc2VsZWN0b3IgPyBHcmlkc3RhY2tDb21wb25lbnQuc2VsZWN0b3JUb1R5cGVbc2VsZWN0b3JdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKCF3LnN1YkdyaWRPcHRzICYmIHR5cGUpIHtcbiAgICAgICAgY29uc3QgY2hpbGRXaWRnZXQgPSBncmlkSXRlbS5jb250YWluZXI/LmNyZWF0ZUNvbXBvbmVudCh0eXBlKT8uaW5zdGFuY2UgYXMgQmFzZVdpZGdldDtcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZFdpZGdldD8uc2VyaWFsaXplID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBjaGlsZFdpZGdldD8uZGVzZXJpYWxpemUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAvLyBwcm9wZXIgQmFzZVdpZGdldCBzdWJjbGFzcywgc2F2ZSBpdCBhbmQgbG9hZCBhZGRpdGlvbmFsIGRhdGFcbiAgICAgICAgICBncmlkSXRlbS5jaGlsZFdpZGdldCA9IGNoaWxkV2lkZ2V0O1xuICAgICAgICAgIGNoaWxkV2lkZ2V0LmRlc2VyaWFsaXplKHcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBncmlkSXRlbS5lbDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy9cbiAgICAvLyBSRU1PVkUgLSBoYXZlIHRvIGNhbGwgQ29tcG9uZW50UmVmOmRlc3Ryb3koKSBmb3IgZHluYW1pYyBvYmplY3RzIHRvIGNvcnJlY3RseSByZW1vdmUgdGhlbXNlbHZlc1xuICAgIC8vIE5vdGU6IHRoaXMgd2lsbCBkZXN0cm95IGFsbCBjaGlsZHJlbiBkeW5hbWljIGNvbXBvbmVudHMgYXMgd2VsbDogZ3JpZEl0ZW0gLT4gY2hpbGRXaWRnZXRcbiAgICAvL1xuICAgIGNvbnN0IG4gPSB3IGFzIEdyaWRTdGFja05vZGU7XG4gICAgaWYgKGlzR3JpZCkge1xuICAgICAgY29uc3QgZ3JpZCA9IChuLmVsIGFzIEdyaWRDb21wSFRNTEVsZW1lbnQpPy5fZ3JpZENvbXA7XG4gICAgICBpZiAoZ3JpZD8ucmVmKSBncmlkLnJlZi5kZXN0cm95KCk7XG4gICAgICBlbHNlIGdyaWQ/Lm5nT25EZXN0cm95KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdyaWRJdGVtID0gKG4uZWwgYXMgR3JpZEl0ZW1Db21wSFRNTEVsZW1lbnQpPy5fZ3JpZEl0ZW1Db21wO1xuICAgICAgaWYgKGdyaWRJdGVtPy5yZWYpIGdyaWRJdGVtLnJlZi5kZXN0cm95KCk7XG4gICAgICBlbHNlIGdyaWRJdGVtPy5uZ09uRGVzdHJveSgpO1xuICAgIH1cbiAgfVxuICByZXR1cm47XG59XG5cbi8qKlxuICogY2FsbGVkIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGdyaWQgLSBjaGVjayBpZiBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIG5lZWRzIHRvIGJlIHNhdmVkLlxuICogTm90ZTogc2luY2UgdGhpcyBpcyBvcHRpb25zIG1pbnVzIGdyaWRzdGFjayBwcml2YXRlIG1lbWJlcnMgdXNpbmcgVXRpbHMucmVtb3ZlSW50ZXJuYWxGb3JTYXZlKCksXG4gKiB0aGlzIHR5cGljYWxseSBkb2Vzbid0IG5lZWQgdG8gZG8gYW55dGhpbmcuIEhvd2V2ZXIgeW91ciBjdXN0b20gQ29tcG9uZW50IEBJbnB1dCgpIGFyZSBub3cgc3VwcG9ydGVkXG4gKiB1c2luZyBCYXNlV2lkZ2V0LnNlcmlhbGl6ZSgpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnc1NhdmVBZGRpdGlvbmFsTmdJbmZvKG46IE5nR3JpZFN0YWNrTm9kZSwgdzogTmdHcmlkU3RhY2tXaWRnZXQpIHtcbiAgY29uc3QgZ3JpZEl0ZW0gPSAobi5lbCBhcyBHcmlkSXRlbUNvbXBIVE1MRWxlbWVudCk/Ll9ncmlkSXRlbUNvbXA7XG4gIGlmIChncmlkSXRlbSkge1xuICAgIGNvbnN0IGlucHV0ID0gZ3JpZEl0ZW0uY2hpbGRXaWRnZXQ/LnNlcmlhbGl6ZSgpO1xuICAgIGlmIChpbnB1dCkge1xuICAgICAgdy5pbnB1dCA9IGlucHV0O1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZWxzZSBjaGVjayBpZiBHcmlkXG4gIGNvbnN0IGdyaWQgPSAobi5lbCBhcyBHcmlkQ29tcEhUTUxFbGVtZW50KT8uX2dyaWRDb21wO1xuICBpZiAoZ3JpZCkge1xuICAgIC8vLi4uLiBzYXZlIGFueSBjdXN0b20gZGF0YVxuICB9XG59XG4iXX0=