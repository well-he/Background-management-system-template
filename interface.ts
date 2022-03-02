interface storage {
    setItem(key: string, val: any): void;
    getItem(key: string): object;
    getStorage(): object;
    clearItem(key: string): void;
    clearAll(): void;
}
