import { useDispatch } from 'react-redux';
import { store } from '../redux';

export function useAppDispatch() {
  return useDispatch<typeof store.dispatch>();
}
