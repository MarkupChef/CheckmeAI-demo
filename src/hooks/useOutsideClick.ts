import { MutableRefObject, useEffect, useRef } from 'react';

const useOutsideClick = (callback: () => void): MutableRefObject<any> => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const refElem = ref.current as HTMLElement | null;
      const target = event.target as HTMLElement;

      if (refElem && !refElem.contains(target)) {
        callback();
      }

      if (target.tagName.toLowerCase() === 'a' || target.closest('a')) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, callback]);

  return ref;
};

export default useOutsideClick;
