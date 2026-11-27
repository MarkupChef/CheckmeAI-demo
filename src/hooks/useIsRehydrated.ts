import useAppSelector from '@hooks/useAppSelector';

// changing a persisted slice before rehydration discards its saved value
const useIsRehydrated = () => useAppSelector((state) => !!state._persist?.rehydrated);

export default useIsRehydrated;
