import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface todoStore {
  todo: string[];
  addTodo(todo: string): void;
  removeTodo(index: number): void;
}

export const useTodoStore = create<todoStore>()(
  persist(
    (set, get) => ({
      todo: [],
      //   addAFish: () => set({ fishes: get().fishes + 1 }),
      //   addTodo: () => set({ todo: [...get().todo, "todobaru"] }),
      addTodo: (todo: string) => set({ todo: [...get().todo, todo] }),
      removeTodo: (index: number) => {
        const newTodo = [...get().todo];
        newTodo.splice(index, 1);
        set({ todo: newTodo });
      },
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
