// Type definitions for react-touch-carousel 0.8
// Project: https://github.com/xiaody/react-touch-carousel
// Definitions by: mikaello <https://github.com/mikaello>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*import * as React from 'react';

export as namespace TouchCarousel;
export = TouchCarousel;



declare namespace TouchCarousel {*/
declare module "react-touch-carousel" {
  import * as React from "react";

  export default class TouchCarousel extends React.PureComponent<TouchCarouselProps> {}

  export interface TouchCarouselProps {
    /**
           * Your container component of the carousel.
           *
           * react-touch-carousel will pass it's touch listeners, dragging/active state, current position cursor to this component.
           *
           * It is actually called like this:
           * ```jsx
             <Component
               cursor={usedCursor}
               carouselState={carouselState}
               onTouchStart={onTouchStart}
               onTouchMove={onTouchMove}
               onTouchEnd={onTouchEnd}
               onTouchCancel={onTouchCancel}
             >
               {allYourRenderedCards}
             </Component>
            ```
           */
    component?: (props: ComponentProps) => React.ReactElement<any> | null;

    /**
     * The width (or height if `vertical` is `true`) in pixels of a card.
     */
    cardSize?: number;

    /**
     * The count of your cards, not including the padded ones.
     */
    cardCount?: number;

    /**
     * The count of padded cards, necessary for looping.
     *
     * Ignored if `loop` is `false`.
     */
    cardPadCount?: number;

    /**
     * The cursor value for initial render.
     *
     * Notice the sign of the number, normally it should be negative or zero (default).
     */
    defaultCursor?: number;

    /**
     * Tail to head, head to tail. Default `true`.
     */
    loop?: boolean;

    /**
     * Interval in milliseconds, 0 as disabled. Default `0`.
     */
    autoplay?: number;

    /**
     * Listen to vertical touch moves instead of horizontal ones. Default `false`.
     */
    vertical?: boolean;

    /**
     * The card renderer.
     *
     * All rendered cards joined as an array will be passed to props.component as it's `children`.
     */
    renderCard?: (
      index: number,
      modIndex: number,
      cursor: number,
      carouselState: CarouselState
    ) => React.ReactElement<any> | null;

    precision?: number;

    tension?: number;

    friction?: number;

    moveScale?: number;

    /**
     * Callback when the carousel is rested at a card.
     */
    onRest?: (
      index: number,
      modIndex: number,
      cursor: number,
      carouselState: CarouselState
    ) => void;

    /**
     * Called when carousel is begun dragged
     */
    onDragStart?: () => void;

    /**
     * Called when carousel movement stopped
     */
    onDragEnd?: () => void;

    /**
     * Called when carousel movement was cancelled
     */
    onDragCancel?: () => void;

    maxOverflow?: number;

    clickTolerance?: number;

    /**
     * If `deltCrossAxis * ignoreCrossMove > deltMainAxis`, carousel would ignore the dragging.
     *
     * `true` as `1` and `false` as `0`. Default `true`.
     */
    ignoreCrossMove?: number | boolean;
  }

  export interface ComponentProps {
    cursor: number;
    carouselState: CarouselState;
    onTouchStart: (e: TouchEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onTouchEnd: (e: TouchEvent) => void;
    onTouchCancel: (e: TouchEvent) => void;
  }

  export interface CarouselState {
    /**
     * The specified cursor
     */
    cursor: number;

    /**
     * Is the user interacting with the component, no matter dragging or pressing or clicking?
     */
    active: boolean;

    /**
     * Is user dragging the component?
     */
    dragging: boolean;

    /**
     * Has the user dragged and released the component, and the component is transitioning to the specified cursor?
     */
    springing: boolean;

    /**
     * Is the cursor moding?
     */
    moding: boolean;
  }
  export const clamp = (n: number, min: number, max: number) => number;
}
