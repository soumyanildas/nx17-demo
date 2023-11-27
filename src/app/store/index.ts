import { atomWithStorage } from 'jotai/utils';

export const authAtom = atomWithStorage<{ isAuthenticated: boolean } | null>('auth', null);
