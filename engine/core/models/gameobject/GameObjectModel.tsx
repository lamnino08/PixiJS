import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import * as PIXI from "pixi.js";
import { Event } from "@/lib/Emiter";


export interface GameObjectConstructorProps {
  width?: number;
  height?: number;
  position?: PIXI.Point;
  rotation?: number;
  scale?: number;
  pivot?: PIXI.Point;
  skew?: PIXI.Point;
  alpha?: number;
  visible?: boolean;
  interactive?: boolean;
  components?: ComponentModel[];
  childrens?: GameObjectModel[];
}

export class GameObjectModel {
  position: PIXI.Point;
  rotation: number;
  scale: number;
  pivot: PIXI.Point;
  skew: PIXI.Point;
  width: number;
  height: number;
  alpha: number;
  visible: boolean;
  interactive: boolean;
  components: Record<string, ComponentModel> = {};
  children: GameObjectModel[] = [];
  parent?: GameObjectModel;

  //#region Pointer_Event
  onHoverEnter = new Event();
  onHoverExit = new Event();
  onPointerDown = new Event();
  onPointerUp = new Event();
  onPointerUpOutside = new Event();
  onPointerTap = new Event();
  //#endregion

  constructor(data: GameObjectConstructorProps = {}) {
    this.position = data.position ? data.position.clone() : new PIXI.Point(0, 0);
    this.rotation = data.rotation ?? 0;
    this.scale = data.scale ?? 1;
    this.width = data.width ?? 100;
    this.height = data.height ?? 100;
    this.pivot = data.pivot ? data.pivot.clone() : new PIXI.Point(0, 0);
    this.skew = data.skew ? data.skew.clone() : new PIXI.Point(0, 0);
    this.alpha = data.alpha ?? 1;
    this.visible = data.visible ?? true;
    this.interactive = data.interactive ?? false;

    data.components?.forEach((c) => this.addComponentInConstructor(c));
    Object.values(this.components).forEach((c) => c.start?.());
    data.childrens?.forEach((child) => this.addChild(child));
  }

  private addComponentInConstructor<T extends ComponentModel>(component: T): T {
    return this.addComponentHelper(component, false);
  }

  addComponent<T extends ComponentModel>(component: T): T {
    return this.addComponentHelper(component, true);
  }

  getComponent<T extends ComponentModel>(ctor: new (...args: any[]) => T): T | undefined {
    return this.components[ctor.name] as T | undefined;
  }

  getOrAddComponent<T extends ComponentModel>(
    ctor: new (...args: any[]) => T,
    factory?: () => T
  ): T {
    const key = ctor.name;

    if (this.components[key]) {
      return this.components[key] as T;
    }

    const component = factory ? factory() : new ctor();
    this.addComponent(component);
    return component;
  }

  removeComponent<T extends ComponentModel>(component: T) {
    const key = component.constructor.name;
    if (this.components[key] === component) {
      component.onDestroy?.();
      delete this.components[key];
      component.onHoverEnter && this.onHoverEnter.unsubscribe(component.onHoverEnter);
      component.onHoverExit && this.onHoverExit.unsubscribe(component.onHoverExit);
    }
  }
  //#region 

  //#region CHILDREN_API
  addChild(child: GameObjectModel) {
    child.parent = this;
    this.children.push(child);
  }

  removeChild(child: GameObjectModel) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      child.destroy();
      this.children.splice(idx, 1);
    }
  }
  //#endregion

  //#region LIFECYCLE
  update(delta: number) {
    Object.values(this.components).forEach((c) => c.update?.(delta));
    this.children.forEach((child) => child.update(delta));
  }

  destroy() {
    Object.values(this.components).forEach((c) => c.onDestroy?.());
    this.components = {};

    this.children.forEach((child) => child.destroy());
    this.children = [];
  }
  //#endregion

  /** Helper to add a component, optionally triggering start() */
  private addComponentHelper<T extends ComponentModel>(component: T, triggerStart: boolean): T {
    const key = component.constructor.name;
    if (this.components[key]) {
      console.warn(`Component of type ${key} already exists.`);
      return this.components[key] as T;
    }

    component.gameObject = this;
    this.components[key] = component;

    this.subscribeComponentEvents(component);

    triggerStart && component.start?.();

    return component;
  }


  /** Helper to subscribe all events from a component */
  private subscribeComponentEvents(component: ComponentModel) {
    if (component.onHoverEnter) this.onHoverEnter.subscribe(component.onHoverEnter);
    if (component.onHoverExit) this.onHoverExit.subscribe(component.onHoverExit);
    if (component.onPointerDown) this.onPointerDown.subscribe(component.onPointerDown);
    if (component.onPointerUp) this.onPointerUp.subscribe(component.onPointerUp);
    if (component.onPointerUpOutside) this.onPointerUpOutside.subscribe(component.onPointerUpOutside);
    if (component.onPointerTap) this.onPointerTap.subscribe(component.onPointerTap);
  }
}
