import { useEffect } from 'react';

const useDisableContextMenu = (isInterviewMode: boolean) => {
  useEffect(() => {
    if (!isInterviewMode) {
      return;
    }

    const disableContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const disableDevToolsHotKeys = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey &&
          event.shiftKey &&
          (event.code === 'KeyI' || event.code === 'KeyJ' || event.code === 'KeyC')) || // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        event.code === 'F12' // F12
      ) {
        event.preventDefault();
      }

      if (
        (event.metaKey && event.altKey && (event.code === 'KeyI' || event.code === 'KeyJ' || event.code === 'KeyC')) || // Cmd+Opt+I, Cmd+Opt+J, Cmd+Opt+C
        event.code === 'F12' // F12 (настроен)
      ) {
        event.preventDefault();
      }
    };

    const disableTextSelection = (event: Event) => {
      const target = event.target as HTMLElement;
      const parentElement = target.nodeType === Node.TEXT_NODE ? target.parentElement : (target as HTMLElement);

      if (parentElement && parentElement.id === 'question') {
        event.preventDefault();
      }

      if (parentElement && parentElement.closest('#question')) {
        event.preventDefault();
      }
    };

    const disableTouchSelection = (event: TouchEvent) => {
      const target = event.target as Node;
      const parentElement = target.nodeType === Node.TEXT_NODE ? target.parentElement : (target as HTMLElement);

      if (parentElement && parentElement.closest('.no-select')) {
        event.preventDefault();
      }
    };

    window.addEventListener('contextmenu', disableContextMenu);
    window.addEventListener('keydown', disableDevToolsHotKeys);
    document.addEventListener('selectstart', disableTextSelection);
    document.addEventListener('touchstart', disableTouchSelection);
    document.addEventListener('touchmove', disableTouchSelection);

    return () => {
      window.removeEventListener('contextmenu', disableContextMenu);
      window.removeEventListener('keydown', disableDevToolsHotKeys);
      document.removeEventListener('selectstart', disableTextSelection);
      document.removeEventListener('touchstart', disableTouchSelection);
      document.removeEventListener('touchmove', disableTouchSelection);
    };
  }, []);
};

export default useDisableContextMenu;
