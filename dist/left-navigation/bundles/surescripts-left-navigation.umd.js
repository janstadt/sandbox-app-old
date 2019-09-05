(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@angular/common'), require('@fortawesome/angular-fontawesome'), require('@fortawesome/free-solid-svg-icons'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@surescripts/left-navigation', ['exports', '@angular/core', '@angular/router', '@angular/common', '@fortawesome/angular-fontawesome', '@fortawesome/free-solid-svg-icons', 'rxjs'], factory) :
    (global = global || self, factory((global.surescripts = global.surescripts || {}, global.surescripts['left-navigation'] = {}), global.ng.core, global.ng.router, global.ng.common, global['@fortawesome/angular-fontawesome'], global['@fortawesome/free-solid-svg-icons'], global.rxjs));
}(this, function (exports, core, router, common, angularFontawesome, freeSolidSvgIcons, rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LeftNavigationService = /** @class */ (function () {
        function LeftNavigationService() {
            this.items = new core.EventEmitter();
            this.toggle = new core.EventEmitter();
            this.header = new core.EventEmitter();
            this.displayFooter = new core.EventEmitter();
            this.collapsed = false;
        }
        /**
         * @param {?=} header
         * @param {?=} items
         * @param {?=} displayFooter
         * @return {?}
         */
        LeftNavigationService.prototype.init = /**
         * @param {?=} header
         * @param {?=} items
         * @param {?=} displayFooter
         * @return {?}
         */
        function (header, items, displayFooter) {
            var _this = this;
            if (displayFooter === null || displayFooter === undefined) {
                displayFooter = true;
            }
            this.header.emit(header);
            this.items.emit(items);
            this.displayFooter.emit(displayFooter);
            this.toggle.subscribe(function (collapsed) { _this.collapsed = collapsed; });
        };
        LeftNavigationService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] },
            { type: core.NgModule }
        ];
        LeftNavigationService.propDecorators = {
            items: [{ type: core.Output }],
            toggle: [{ type: core.Output }],
            header: [{ type: core.Output }],
            displayFooter: [{ type: core.Output }]
        };
        /** @nocollapse */ LeftNavigationService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function LeftNavigationService_Factory() { return new LeftNavigationService(); }, token: LeftNavigationService, providedIn: "root" });
        return LeftNavigationService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LeftNavigationComponent = /** @class */ (function () {
        function LeftNavigationComponent(leftNavService, router) {
            var _this = this;
            this.leftNavService = leftNavService;
            this.router = router;
            this.collapsed = false;
            this.displayNav = false;
            this.displayFooter = true;
            this.highlightLinks = true;
            this.leftNavService.displayFooter.subscribe(function (display) {
                _this.displayFooter = display;
            });
            this.leftNavService.items.subscribe(function (items) {
                if (items && items.length > 0) {
                    _this.items = items;
                    _this.displayNav = true;
                }
                else {
                    _this.displayNav = false;
                }
            });
            this.leftNavService.header.subscribe(function (header) {
                if (header) {
                    _this.header = header;
                }
            });
        }
        /**
         * @param {?} item
         * @return {?}
         */
        LeftNavigationComponent.prototype.isLinkActive = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var charPos = this.router.url.indexOf('?');
            if (charPos > -1 && !item.queryParams) {
                return false;
            }
            else if (item.queryParams) {
                if (charPos === -1) {
                    return false;
                }
                /** @type {?} */
                var tree = this.router.createUrlTree([item.url], { queryParams: item.queryParams });
                return this.router.url.startsWith(tree.toString());
            }
            /** @type {?} */
            var cleanUrl = charPos !== -1 ? this.router.url.slice(0, charPos) : this.router.url;
            return cleanUrl === item.url;
        };
        /**
         * @return {?}
         */
        LeftNavigationComponent.prototype.toggle = /**
         * @return {?}
         */
        function () {
            this.collapsed = !this.collapsed;
            this.leftNavService.toggle.emit(this.collapsed);
        };
        LeftNavigationComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'surescripts-left-navigation',
                        template: "<nav class=\"sidebar\" [ngClass]=\"collapsed ? 'collapsed' : ''\" *ngIf=\"displayNav\">\r\n  <div class=\"sidebar-header\" *ngIf=\"header\">\r\n      <h1 [title]=\"header.title\">\r\n          <i class=\"icon\" *ngIf=\"header?.icon\">\r\n              <fa-icon [fixedWidth]=\"true\" [icon]=\"[header.icon.prefix, header.icon.name]\" *ngIf=\"header?.icon\" [size]=\"collapsed ? '1x' : '2x'\"></fa-icon>\r\n          </i> <span>{{header.title}}</span>\r\n      </h1>\r\n  </div>\r\n  <div class=\"sidebar-body\" [ngClass]=\"{'no-footer': !displayFooter, 'no-header': !header }\">\r\n      <ul class=\"nav flex-column\" *ngIf=\"items && items.length > 0\">\r\n          <li [class.active]=\"highlightLinks && item?.link?.relative ? isLinkActive(item.link) : false\" class=\"nav-item\" *ngFor=\"let item of items; let i = index\">\r\n            <a *ngIf=\"item.itemType === 'fn'\" [ngClass]=\"collapsed ? 'pl-3' : 'pl-4'\" (click)=\"item?.onClick($event)\" href=\"javascript:void(0);\" class=\"nav-link\" [id]=\"'left-navlink-'+ item.id\" [title]=\"header && header.title ? header.title + ' ' + item.text : item.text\">\r\n                <fa-icon *ngIf=\"item?.icon\" [fixedWidth]=\"true\" [icon]=\"[item.icon.prefix, item.icon.name]\"></fa-icon> <span class=\"text\">{{item.text}}</span>\r\n            </a>\r\n            <a *ngIf=\"item.itemType === 'link' && !item?.link?.relative\" [ngClass]=\"collapsed ? 'pl-3' : 'pl-4'\" class=\"nav-link\" [id]=\"'left-navlink-'+ item.id\" [title]=\"header && header.title ? header.title + ' ' + item.text : item.text\" [target]=\"item.link.target\" [href]=\"item.link.url\">\r\n                <fa-icon *ngIf=\"item?.icon\" [fixedWidth]=\"true\" [icon]=\"[item.icon.prefix, item.icon.name]\"></fa-icon> <span class=\"text\">{{item.text}}</span>\r\n            </a>\r\n            <a *ngIf=\"item.itemType === 'link' && item?.link?.relative\" [ngClass]=\"collapsed ? 'pl-3' : 'pl-4'\" class=\"nav-link\" [id]=\"'left-navlink-'+ item.id\" [title]=\"header && header.title ? header.title + ' ' + item.text : item.text\" [target]=\"item.link.target\" [routerLink]=\"[item.link.url]\" [queryParams]=\"item.link.queryParams\">\r\n                <fa-icon *ngIf=\"item?.icon\" [fixedWidth]=\"true\" [icon]=\"[item.icon.prefix, item.icon.name]\"></fa-icon> <span class=\"text\">{{item.text}}</span>\r\n            </a>\r\n            <hr *ngIf=\"item.itemType === 'hr'\" />\r\n            <h4 *ngIf=\"item.itemType === 'heading'\" [ngClass]=\"collapsed ? 'pl-3' : 'pl-4'\" [id]=\"item.id\">{{item.text}}</h4>\r\n          </li>\r\n      </ul>\r\n  </div>\r\n  <div class=\"sidebar-footer\" *ngIf=\"displayFooter\">\r\n      <div class=\"toggle collapse\" (click)=\"toggle()\"  title=\"Collapse Left Navigation\" id=\"leftnav-collapse\">\r\n          <fa-icon [icon]=\"['fas', 'chevron-left']\"></fa-icon> <fa-icon [icon]=\"['fas', 'chevron-left']\"></fa-icon>\r\n      </div>\r\n      <div class=\"toggle expand\" (click)=\"toggle()\" title=\"Expand Left Navigation\" id=\"leftnav-expand\">\r\n          <fa-icon [icon]=\"['fas', 'chevron-right']\"></fa-icon> <fa-icon [icon]=\"['fas', 'chevron-right']\"></fa-icon>\r\n      </div>\r\n  </div>\r\n</nav>\r\n"
                    }] }
        ];
        /** @nocollapse */
        LeftNavigationComponent.ctorParameters = function () { return [
            { type: LeftNavigationService },
            { type: router.Router }
        ]; };
        LeftNavigationComponent.propDecorators = {
            highlightLinks: [{ type: core.Input }]
        };
        return LeftNavigationComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NavItemIcon = /** @class */ (function () {
        function NavItemIcon(init) {
            Object.assign(this, init);
        }
        return NavItemIcon;
    }());
    /** @enum {string} */
    var NavItemType = {
        Link: 'link',
        Heading: 'heading',
        HR: 'hr',
        Function: 'fn',
    };
    var NavItemLink = /** @class */ (function () {
        function NavItemLink(init) {
            this.relative = true;
            this.target = '_self';
            Object.assign(this, init);
        }
        return NavItemLink;
    }());
    var NavItem = /** @class */ (function () {
        function NavItem(init) {
            this.onClick = rxjs.noop;
            if (init) {
                init.icon = new NavItemIcon(init.icon);
                if (init.itemType === NavItemType.Function) {
                    init.link = undefined;
                    init.onClick = init.onClick || rxjs.noop;
                }
                else if (init.itemType === NavItemType.Link) {
                    init.onClick = undefined;
                    init.link = new NavItemLink(init.link);
                }
            }
            Object.assign(this, init);
        }
        return NavItem;
    }());
    var NavHeading = /** @class */ (function () {
        function NavHeading(init) {
            if (init) {
                init.icon = new NavItemIcon(init.icon);
            }
            Object.assign(this, init);
        }
        return NavHeading;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LeftNavigationModule = /** @class */ (function () {
        function LeftNavigationModule(library) {
            library.addIcons(freeSolidSvgIcons.faChevronLeft, freeSolidSvgIcons.faChevronRight);
        }
        /**
         * @return {?}
         */
        LeftNavigationModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: LeftNavigationModule,
                providers: [LeftNavigationService]
            };
        };
        LeftNavigationModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, angularFontawesome.FontAwesomeModule, router.RouterModule],
                        declarations: [LeftNavigationComponent],
                        exports: [LeftNavigationComponent]
                    },] }
        ];
        /** @nocollapse */
        LeftNavigationModule.ctorParameters = function () { return [
            { type: angularFontawesome.FaIconLibrary }
        ]; };
        return LeftNavigationModule;
    }());

    exports.LeftNavigationComponent = LeftNavigationComponent;
    exports.LeftNavigationModule = LeftNavigationModule;
    exports.LeftNavigationService = LeftNavigationService;
    exports.NavHeading = NavHeading;
    exports.NavItem = NavItem;
    exports.NavItemLink = NavItemLink;
    exports.NavItemType = NavItemType;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=surescripts-left-navigation.umd.js.map
