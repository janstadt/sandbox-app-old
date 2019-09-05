import { Component, Input } from '@angular/core';
import { NavItem, NavHeading, NavItemLink } from './nav-item.model';
import { LeftNavigationService } from './left-navigation.service';
// import { faChevronLeft, faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {  Router } from '@angular/router';

@Component({
    selector: 'surescripts-left-navigation',
    templateUrl: './left-navigation.component.html'
})
export class LeftNavigationComponent {
    // faChevronLeft: IconDefinition = faChevronLeft;
    // faChevronRight: IconDefinition = faChevronRight;
    items: Array<NavItem>;
    header: NavHeading;
    collapsed = false;
    displayNav = false;
    displayFooter = true;
    @Input()
    highlightLinks = true;

    constructor(private leftNavService: LeftNavigationService, private router: Router) {
        this.leftNavService.displayFooter.subscribe((display: boolean) => {
            this.displayFooter = display;
        });

        this.leftNavService.items.subscribe((items: Array<NavItem>) => {
            if (items && items.length > 0) {
                this.items = items;
                this.displayNav = true;
            } else {
                this.displayNav = false;
            }
        });

        this.leftNavService.header.subscribe((header: NavHeading) => {
            if (header) {
                this.header = header;
            }
        });
    }

    public isLinkActive(item: NavItemLink) {
        const charPos = this.router.url.indexOf('?');
        if (charPos > -1 && !item.queryParams) {
            return false;
        }
        else if (item.queryParams) {
            if (charPos === -1) {
                return false;
            }
            const tree = this.router.createUrlTree([item.url], { queryParams: item.queryParams });
            return this.router.url.startsWith(tree.toString());
        }

        const cleanUrl = charPos !== -1 ? this.router.url.slice(0, charPos) : this.router.url;
        return cleanUrl === item.url;
    }

    toggle() {
        this.collapsed = !this.collapsed;
        this.leftNavService.toggle.emit(this.collapsed);
    }
}
