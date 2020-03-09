import { Commander, Prop } from './lib/main.js';
import { Accordion, init as accordionInit } from './lib/Accordion.js';

export function init(props?: Readonly<Prop[]>) {
  if (props !== undefined) {
    new Commander(props);
  } else {
    const triggers = Array.from(document.querySelectorAll('[data-dd-trigger]'));
    if (triggers.length === 0) {
      return;
    }

    const defaultProps: Readonly<Prop[]> = triggers.map(trigger => {
      const id = trigger.getAttribute('data-dd-trigger')!;
      const container = document.querySelector(`[data-dd-container="${id}"]`);
      if (container === null) {
        throw new Error(`[data-dd-container="${id}"] is missing`);
      }

      return { trigger, container } as Prop;
    });

    new Commander(defaultProps);
  }
}

export { accordionInit };
