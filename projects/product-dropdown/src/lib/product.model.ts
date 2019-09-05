export class SurescriptsProduct {
    text: string;
    link: string;
    selected: boolean;
    children: Array<SurescriptsProduct>;
    public constructor(init?: Partial<SurescriptsProduct>) {
        Object.assign(this, init);
        if (init && init.children && init.children.length > 0) {
            this.children = init.children.map(x => new SurescriptsProduct(x));
        }
    }
}
