import { useEventListener } from 'usehooks-ts';
import type { RefObject } from 'react';

type Handler = (event: MouseEvent) => void;

function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  if (!ref) {
    return;
  }

  useEventListener(mouseEvent, (event) => {
    const el = ref.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });
}

export default useOutsideClick;
