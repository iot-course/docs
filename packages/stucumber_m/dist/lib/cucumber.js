"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_table_1 = require("./data-table");
var HookType;
(function (HookType) {
    HookType[HookType["BeforeFeatures"] = 0] = "BeforeFeatures";
    HookType[HookType["BeforeScenarios"] = 1] = "BeforeScenarios";
    HookType[HookType["AfterFeatures"] = 2] = "AfterFeatures";
    HookType[HookType["AfterScenarios"] = 3] = "AfterScenarios";
})(HookType = exports.HookType || (exports.HookType = {}));
const types = {
    string: { regex: '"([^"]*)"' },
    int: { regex: "([-+]?\\d+)", converter: parseInt },
    float: { regex: "([-+]?\\d*(?:\\.\\d+)?)", converter: parseFloat },
    word: { regex: "([^\\s]+)" }
};
class Cucumber {
    constructor() {
        this.rules = [];
        this.hooks = [];
    }
    defineRule(match, handler) {
        if (match instanceof RegExp) {
            this.rules.push({ regex: match, handler });
        }
        else {
            this.rules.push(this.compileTemplate(match, handler));
        }
    }
    addHook(type, handler) {
        this.hooks.push({ type, handler });
    }
    runHook(type, world, context) {
        const annotations = [];
        if (context) {
            annotations.push(...context.annotations);
            if (context.feature) {
                annotations.push(...context.feature.annotations);
            }
        }
        return Promise.all(this.hooks
            .filter(hook => hook.type === type)
            .map(hook => hook.handler.call(context, world, annotations)));
    }
    enterFeature(feature) {
        return this.runHook(HookType.BeforeFeatures, null, feature);
    }
    enterScenario(world, scenario) {
        return this.runHook(HookType.BeforeScenarios, world, scenario);
    }
    exitFeature(feature) {
        return this.runHook(HookType.AfterFeatures, null, feature);
    }
    exitScenario(world, scenario) {
        return this.runHook(HookType.AfterScenarios, world, scenario);
    }
    compileTemplate(match, handler) {
        const converters = [];
        const names = [];
        let usesNamedCaptures = false;
        const regex = match.replace(/\{(([a-zA-Z0-9-_]+):)?([a-zA-Z-_]+)\}/g, (placeholder, _, name, typeName) => {
            const type = types[typeName];
            if (!type) {
                throw new Error(`Invalid placeholder '${placeholder}'`);
            }
            converters.push(type.converter);
            names.push(name);
            usesNamedCaptures = usesNamedCaptures || !!name;
            return type.regex;
        });
        const convertHandler = (world, ...params) => {
            params = params.map((value, i) => typeof converters[i] === "function" ? converters[i](value) : value);
            const namedParams = {};
            if (usesNamedCaptures) {
                params.forEach((value, i) => {
                    if (names[i])
                        namedParams[names[i]] = value;
                });
            }
            return usesNamedCaptures
                ? handler(world, namedParams)
                : handler(world, ...params);
        };
        return { regex: new RegExp(`^${regex}$`), handler: convertHandler };
    }
    defineCreateWorld(_createWorld) {
        this._createWorld = _createWorld;
    }
    rule(world, str, data, params) {
        if (params) {
            str = str.replace(/<([^>]+)>/g, (_, key) => params[key]);
        }
        for (const rule of this.rules) {
            const match = str.match(rule.regex);
            if (match) {
                const args = [world, ...match.slice(1)];
                if (data) {
                    args.push(new data_table_1.default(data));
                }
                return Promise.resolve(rule.handler.apply(this, args));
            }
        }
        throw new Error(`Could not find matching rule: ${str}`);
    }
    createWorld() {
        return this._createWorld ? this._createWorld() : null;
    }
    clone() {
        const copy = new Cucumber();
        copy._createWorld = this._createWorld;
        copy.rules = this.rules.slice();
        copy.hooks = this.hooks.slice();
        return copy;
    }
}
exports.default = Cucumber;
exports.cucumber = new Cucumber();
//# sourceMappingURL=cucumber.js.map