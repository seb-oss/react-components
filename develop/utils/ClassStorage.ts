export class ClassStorage {
    setItem(name: string, value: any): void {
        this[name] = value;
    }
    getItem(name: string): any {
        return this[name];
    }
}
