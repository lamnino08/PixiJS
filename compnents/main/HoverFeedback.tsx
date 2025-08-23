import { ComponentModel } from "@/models/gameobject/ComponentModel";

export interface HoverFeedbackProps {
    scaleNormal?: number;
    scaleHover?: number;
    duration?: number;
}

export class HoverFeedbackComponent extends ComponentModel {
    props: Required<HoverFeedbackProps>;

    constructor(props?: HoverFeedbackProps) {
        super();
        this.props = {
            scaleNormal: props?.scaleNormal ?? 1,
            scaleHover: props?.scaleHover ?? 1.02,
            duration: props?.duration ?? 200,
        };

        this.onHoverEnter = () => {
            this.gameObject.doScale(this.props.scaleHover, this.props.duration);
        };

        this.onHoverExit = () => {
            this.gameObject.doScale(this.props.scaleNormal, this.props.duration);
        };
    }
}

