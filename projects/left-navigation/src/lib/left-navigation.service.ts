import { Injectable, Output, EventEmitter, NgModule } from '@angular/core';
import { NavItem, NavHeading } from './nav-item.model';

@Injectable({
  providedIn: 'root'
})
@NgModule()
export class LeftNavigationService {
    @Output() items: EventEmitter<Array<NavItem>> = new EventEmitter();
    @Output() toggle: EventEmitter<boolean> = new EventEmitter();
    @Output() header: EventEmitter<NavHeading> = new EventEmitter();
    @Output() displayFooter: EventEmitter<boolean> = new EventEmitter();
    collapsed = false;
    init(header?: NavHeading, items?: Array<NavItem>, displayFooter?: boolean) {
        if (displayFooter === null || displayFooter === undefined) {
            displayFooter = true;
        }
        this.header.emit(header);
        this.items.emit(items);
        this.displayFooter.emit(displayFooter);
        this.toggle.subscribe((collapsed: boolean) => { this.collapsed = collapsed; });
    }
}