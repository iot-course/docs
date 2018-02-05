import { Annotation } from "./parser";
export interface TestContext {
    name: string;
    annotations: string[];
    meta: {
        [key: string]: any;
    };
}
export interface FeatureContext extends TestContext {
}
export interface ScenarioContext extends TestContext {
    feature: FeatureContext;
}
export interface RuleHandler {
    (world: any, ...args: any[]): any;
}
export interface FeatureHookHandler {
    (this: FeatureContext, world?: any): any;
}
export interface ScenarioHookHandler {
    (this: ScenarioContext, world?: any, annotations?: Annotation[]): any;
}
export declare type HookHandler = FeatureHookHandler | ScenarioHookHandler;
export declare enum HookType {
    BeforeFeatures = 0,
    BeforeScenarios = 1,
    AfterFeatures = 2,
    AfterScenarios = 3,
}
export default class Cucumber {
    private rules;
    private hooks;
    private _createWorld;
    defineRule(match: string, handler: RuleHandler): any;
    defineRule(match: RegExp, handler: RuleHandler): any;
    addHook(type: HookType.BeforeFeatures | HookType.AfterFeatures, handler: FeatureHookHandler): any;
    addHook(type: HookType.BeforeScenarios | HookType.AfterScenarios, handler: ScenarioHookHandler): any;
    private runHook(type, world?, context?);
    enterFeature(feature: FeatureContext): Promise<any[]>;
    enterScenario(world: any, scenario: ScenarioContext): Promise<any[]>;
    exitFeature(feature: FeatureContext): Promise<any[]>;
    exitScenario(world: any, scenario: ScenarioContext): Promise<any[]>;
    private compileTemplate(match, handler);
    defineCreateWorld(_createWorld: () => any): void;
    rule(world: any, str: string, data?: string[][], params?: {
        [key: string]: any;
    }): any;
    createWorld(): any;
    clone(): Cucumber;
}
export declare const cucumber: default;
