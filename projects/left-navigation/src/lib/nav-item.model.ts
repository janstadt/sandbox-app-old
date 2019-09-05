import { noop } from 'rxjs';

export class NavItemIcon {
    prefix: string;
    name: string;
    public constructor(init?: Partial<NavItemIcon>) {
        Object.assign(this, init);
    }
}

export enum NavItemType {
    Link = 'link',
    Heading = 'heading',
    HR = 'hr',
    Function = 'fn'
}

export class NavItemLink {
    relative ? = true;
    url: string;
    target ? = '_self';
    queryParams ?: {
        [k: string]: any;
    };
    public constructor(init?: Partial<NavItemLink>) {
        Object.assign(this, init);
    }
}

export class NavItem {
    text: string;
    itemType: NavItemType;
    icon: NavItemIcon;
    link: NavItemLink;
    onClick:  ($event: any) => void = noop;
    selected: boolean;
    id: string;
    public constructor(init?: Partial<NavItem>) {
        if (init) {
            init.icon = new NavItemIcon(init.icon);
            if (init.itemType === NavItemType.Function) {
                init.link = undefined;
                init.onClick = init.onClick || noop;
            } else if (init.itemType === NavItemType.Link) {
                init.onClick = undefined;
                init.link = new NavItemLink(init.link);
            }
        }
        Object.assign(this, init);
    }
}

export class NavHeading {
    icon: NavItemIcon;
    title: string;
    public constructor(init?: Partial<NavItem>) {
        if (init) {
            init.icon = new NavItemIcon(init.icon);
        }
        Object.assign(this, init);
    }
}