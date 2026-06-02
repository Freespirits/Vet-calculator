/**
 * Ambient JSX typing for the <dotlottie-player> web component
 * (defined by @dotlottie/player-component, loaded via index.html).
 */
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type DotLottiePlayerProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  background?: string;
  speed?: string | number;
  mode?: string;
  loop?: boolean;
  autoplay?: boolean;
  controls?: boolean;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': DotLottiePlayerProps;
    }
  }
}
