import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { Easing } from "@/lib/tween/Easing";
import "@/lib/tween/GameObjectTween";

export interface HoverFeedbackProps {
    scaleNormal?: number;
    scaleHover?: number;
    duration?: number;
    easing?: (t: number) => number
}

export class HoverFeedbackComponent extends ComponentModel {
    props: Required<HoverFeedbackProps>;

    private _isEbale: boolean = true;

    constructor(props?: HoverFeedbackProps) {
        super();
        this.props = {
            scaleNormal: props?.scaleNormal ?? 1,
            scaleHover: props?.scaleHover ?? 1.05,
            duration: props?.duration ?? 400,
            easing: props?.easing ?? Easing.easeOutCubic,
        };
    }

    onHoverEnter = () => {
        this._isEbale && this.gameObject.doScale(this.props.scaleHover, this.props.duration, undefined, this.props.easing);
    };

    onHoverExit = () => {
        this._isEbale && this.gameObject.doScale(this.props.scaleNormal, this.props.duration, undefined, this.props.easing);
    };

    enable = (isEnabled: boolean) => {
        this.onHoverExit();
        this._isEbale = isEnabled;
    }
}
