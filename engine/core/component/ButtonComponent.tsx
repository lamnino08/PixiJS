import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { SpriteComponentModel } from "@/engine/core/models/gameobject/SpriteComponentModel";
import "@/lib/tween/SpriteTween"

export interface ButtonProps {
  text?: string;
  onClick?: () => void;
}

export class ButtonComponentModel extends ComponentModel {
  text: string = "button";
  sprite?: SpriteComponentModel;

  constructor(props: ButtonProps) {
    super();
    this.text = props.text ?? "button";
  }

  start(): void {
    // tạo sprite nếu chưa có
    this.sprite = this.gameObject.getOrAddComponent(
      SpriteComponentModel,
    );
  }

  addListener(fn: (...args: any[]) => void) {
    this.gameObject.onPointerDown.subscribe(fn);
  }

  onHoverEnter = () => {
    this.sprite?.doColor(0xffcc66, 200);
  }

  onHoverExit = () => {
    this.sprite?.doColor(0xffffff, 200);
  }

  onPointerDown = () => {
    this.sprite?.doColor(0xff9933, 100);
  }

  onPointerUp = () => {
    this.sprite?.doColor(0xffcc66, 150);
  }
}
