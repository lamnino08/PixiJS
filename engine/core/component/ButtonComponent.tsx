import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { SpriteComponentModel } from "@/engine/core/models/gameobject/SpriteComponentModel";
import { TextComponentModel } from "@/engine/core/models/gameobject/TextComponentModel";
import { Event } from "@/lib/Event";
import "@/lib/tween/SpriteTween";
import { ITextStyle, TextStyle } from "pixi.js";

export interface ButtonProps {
  text?: string;
  textStyle?: Partial<ITextStyle>;
  disabled?: boolean;
  
  normalColor?: number;
  hoverColor?: number;
  pressedColor?: number;
  disabledColor?: number;
}

export class ButtonComponentModel extends ComponentModel {
  text: string;
  textStyle: Partial<ITextStyle>;
  disabled: boolean;

  normalColor: number;
  hoverColor: number;
  pressedColor: number;
  disabledColor: number;

  sprite?: SpriteComponentModel;
  textComponent?: TextComponentModel;

  onClick = new Event();

  constructor(props: ButtonProps = {}) {
    super();
    this.text = props.text ?? "button";
    this.textStyle = props.textStyle ?? new TextStyle({
      fill: "#000000",
    });
    this.disabled = props.disabled ?? false;

    this.normalColor = props.normalColor ?? 0xffffff;
    this.hoverColor = props.hoverColor ?? 0xffcc66;
    this.pressedColor = props.pressedColor ?? 0xff9933;
    this.disabledColor = props.disabledColor ?? 0xaaaaaa;
  }

  start(): void {
    this.gameObject.interactive = true;
    this.sprite = this.gameObject.getOrAddComponent(SpriteComponentModel, () => new SpriteComponentModel({ radius: 10 }));
    this.textComponent = this.gameObject.getOrAddComponent(TextComponentModel, () => new TextComponentModel({ text: this.text, style: this.textStyle }));

    this.updateButtonState();
  }

  onHoverEnter = () => {
    if (this.disabled) return;
    this.sprite?.doColor(this.hoverColor, 100);
  };

  onHoverExit = () => {
    if (this.disabled) return;
    this.sprite?.doColor(this.normalColor, 100);
  };

  onPointerDown = () => {
    if (this.disabled) return;
    this.sprite?.doColor(this.pressedColor, 100);
    this.onClick.invoke();
  };

  onPointerUp = () => {
    if (this.disabled) return;
    this.sprite?.doColor(this.hoverColor, 100);
  };

  setDisabled(disabled: boolean) {
    this.disabled = disabled;
    this.updateButtonState();
  }

  private updateButtonState() {
    this.gameObject.interactive = !this.disabled;
    const targetColor = this.disabled ? this.disabledColor : this.normalColor;
    this.sprite?.doColor(targetColor, 200);
  }
}
