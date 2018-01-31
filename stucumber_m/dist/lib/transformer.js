"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
class Transformer {
    transform(filename, source) {
        const feature = typeof source === 'string' ? parser_1.parse(source) : source;
        const background = feature.background || [];
        return this.transformFile(filename, this.transformFeature(filename, feature, feature.ruleDeclarations
            ? feature.ruleDeclarations.map((ruleDeclaration) => this.transformRuleDeclaration(filename, feature, ruleDeclaration, ruleDeclaration.rules.map((rule) => this.transformRule(filename, feature, null, rule, true))))
            : [], feature.scenarios.map((scenario) => this.transformScenario(filename, feature, scenario, [...background, ...scenario.rules].map((rule) => this.transformRule(filename, feature, scenario, rule))))));
    }
}
exports.default = Transformer;
//# sourceMappingURL=transformer.js.map