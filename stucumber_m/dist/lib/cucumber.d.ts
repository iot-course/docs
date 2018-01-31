import { Annotation } from "./parser";
export interface RuleHandler {
    (world: any, ...args: any[]): any;
}
export interface HookHandler {
    (world?: any, annotations?: string[]): any;
}
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
    addHook(type: HookType, handler: HookHandler): void;
    private runHook(type, world?, annotations?);
    enterFeature(annotations: Annotation[]): Promise<any[]>;
    enterScenario(world: any, annotations: Annotation[]): Promise<any[]>;
    exitFeature(annotations: Annotation[]): Promise<any[]>;
    exitScenario(world: any, annotations: Annotation[]): Promise<any[]>;
    private compileTemplate(match, handler);
    defineCreateWorld(_createWorld: () => any): void;
    rule(world: any, str: string, data?: string[][], params?: {
        [key: string]: any;
    }): any;
    createWorld(): any;
    clone(): Cucumber;
}
export declare const cucumber: Cucumber;
