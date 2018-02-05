"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformer_1 = require("./transformer");
// TODO: upgrade when new version is published, source-map types are currently fucked
const SourceNode = require('source-map').SourceNode;
class GenericTransformer extends transformer_1.default {
    constructor(options) {
        super();
        this.options = Object.assign({ getFeatureName: (feature) => 'Feature: ' + feature.name.value, getScenarioName: (feature, scenario) => scenario.name.value, preamble: 'const {cucumber} = require("stucumber"); const _cucumber = cucumber.clone();' }, options);
    }
    transformFile(filename, file) {
        const { code, map } = new SourceNode(1, 1, filename, [
            this.options.preamble,
            file
        ]).toStringWithSourceMap({ file: filename });
        return (code +
            '\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,' +
            Buffer.from(map.toString(), 'utf8').toString('base64'));
    }
    getContext(name, annotations, includeFeature) {
        const context = { name, annotations, meta: {} };
        let json = JSON.stringify(context);
        if (includeFeature) {
            json = `${json.slice(0, -1)}, "feature": feature}`;
        }
        return json;
    }
    transformFeature(filename, feature, ruleDeclarations, scenarios) {
        let chunks = [
            `const feature = `,
            this.getContext(feature.name.value, feature.annotations),
            ';',
            `${this.options.beforeAllFn}(() => {`,
            ...ruleDeclarations,
            `_cucumber.enterFeature(feature);
      });`,
            `${this.options.afterAllFn}(() => _cucumber.exitFeature(feature));`,
            ...scenarios
        ];
        if (this.options.featureFn) {
            chunks = [
                this.options.featureFn,
                `(`,
                JSON.stringify(this.options.getFeatureName(feature)),
                `, () => {`,
                ...chunks,
                `});`
            ];
        }
        return new SourceNode(feature.name.location.line, feature.name.location.column, filename, chunks);
    }
    transformRuleDeclaration(filename, feature, ruleDeclaration, rules) {
        return new SourceNode(ruleDeclaration.template.location.line, ruleDeclaration.template.location.column, filename, [
            '_cucumber.defineRule(',
            JSON.stringify(ruleDeclaration.template.value),
            ', (world, params) => Promise.resolve()',
            ...rules,
            ');'
        ]);
    }
    transformScenario(filename, feature, scenario, rules) {
        return new SourceNode(scenario.name.location.line, scenario.name.location.column, filename, [
            this.options.scenarioFn,
            `(`,
            JSON.stringify(this.options.getScenarioName(feature, scenario)),
            `, () => {`,
            `const world = _cucumber.createWorld();`,
            `const scenario = `,
            this.getContext(scenario.name.value, scenario.annotations, true),
            `;`,
            `return _cucumber.enterScenario(world, scenario)`,
            ...[].concat(...rules),
            `.then(() => _cucumber.exitScenario(world, scenario));`,
            `});`
        ]);
    }
    transformRule(filename, feature, scenario, rule, template) {
        return [
            `.then(() => `,
            new SourceNode(rule.location.line, rule.location.column, filename, [
                `_cucumber.rule(world, `,
                JSON.stringify(rule.value),
                ', ',
                rule.data && rule.data.length ? JSON.stringify(rule.data) : 'null',
                template ? ', params' : '',
                `)`
            ]),
            `)`
        ];
    }
}
exports.default = GenericTransformer;
//# sourceMappingURL=generic-transformer.js.map