import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}
// has a bunch of players. holds all of them


const usePlayer = create<PlayerStore>((set) => ({
    // this automatically returns this object
    // everytime we click play, we get a list of ids in our playlist. we also get our active id
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined })
}));

// creates our store

export default usePlayer;