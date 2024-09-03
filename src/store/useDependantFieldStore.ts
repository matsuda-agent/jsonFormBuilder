// src/store/useDependantFieldStore.ts
import {create} from 'zustand';

interface DependantFieldState {
  dependantFields: Record<string, any>;
  setDependantField: (fieldName: string, value: any) => void;
  removeDependantField: (fieldName: string) => void;
}

const useDependantFieldStore = create<DependantFieldState>((set) => ({
  dependantFields: {},
  setDependantField: (fieldName, value) =>
    set((state) => ({
      dependantFields: { ...state.dependantFields, [fieldName]: value },
    })),
  removeDependantField: (fieldName) =>
    set((state) => {
      const newFields = { ...state.dependantFields };
      delete newFields[fieldName];
      return { dependantFields: newFields };
    }),
}));

export default useDependantFieldStore;