export interface Hash<T> {
    [key: string]: T;
}
export default class DataTable {
    private data;
    constructor(data: string[][]);
    raw(): string[][];
    asObjects(): Hash<string>[];
    asKeyValuePairs(): Hash<string>;
    asKeyValuePairs<T>(mapValue: (value: string, key?: string) => T): Hash<T>;
    asList(): string[];
    asList<T>(mapValue: (value: string, i?: number) => T): T[];
}
