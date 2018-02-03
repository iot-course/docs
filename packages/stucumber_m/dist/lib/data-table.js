"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataTable {
    constructor(data) {
        this.data = data;
    }
    raw() {
        return this.data;
    }
    asObjects() {
        if (this.data.length < 1) {
            throw new Error('need at least 1 row');
        }
        const keys = this.data[0];
        return this.data.slice(1).map(row => {
            const obj = {};
            if (row.length !== keys.length) {
                throw new Error('rows must be the same length');
            }
            row.forEach((cell, i) => {
                obj[keys[i]] = cell;
            });
            return obj;
        });
    }
    asKeyValuePairs(mapValue) {
        const obj = {};
        this.data.forEach((row) => {
            const [key, value] = row;
            if (row.length !== 2) {
                throw new Error('expected every row to have length 2');
            }
            obj[key] = mapValue ? mapValue(value, key) : value;
        });
        return obj;
    }
    asList(mapValue) {
        return this.data.map((row) => {
            if (row.length !== 1) {
                throw new Error('expected a table with exactly one column');
            }
            const cell = row[0];
            return mapValue ? mapValue(cell) : cell;
        });
    }
}
exports.default = DataTable;
//# sourceMappingURL=data-table.js.map