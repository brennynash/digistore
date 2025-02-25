interface TouchHandlers {
  onTouchStart?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
}

export const addTouchHandlers = (element: HTMLElement, handlers: TouchHandlers) => {
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  element.addEventListener('touchstart', (e: TouchEvent) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = false;
    handlers.onTouchStart?.(e);
  }, { passive: true });

  element.addEventListener('touchmove', (e: TouchEvent) => {
    if (!isDragging) {
      const deltaX = Math.abs(e.touches[0].clientX - startX);
      const deltaY = Math.abs(e.touches[0].clientY - startY);
      if (deltaX > 10 || deltaY > 10) {
        isDragging = true;
      }
    }
    handlers.onTouchMove?.(e);
  }, { passive: true });

  element.addEventListener('touchend', (e: TouchEvent) => {
    if (!isDragging) {
      // Handle tap
      const target = e.target as HTMLElement;
      target.click();
    }
    handlers.onTouchEnd?.(e);
  }, { passive: true });
};