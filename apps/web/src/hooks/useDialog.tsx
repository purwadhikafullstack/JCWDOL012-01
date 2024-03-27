import { create } from 'zustand';

interface DialogProps {
  isProps: boolean;
  isOpenRegister: boolean;
  isOpenLogin: boolean;
  onOpenRegister: () => void;
  onCloseRegister: () => void;
  onOpenLogin: () => void;
  onCloseLogin: () => void;
  data: any;
  setData(data: any): void;
  setIsProps: () => void;
}

export const useDialog = create<DialogProps>((set) => ({
  isProps: false,
  isOpenRegister: false,
  isOpenLogin: false,
  onOpenRegister: () => set({ isOpenRegister: true, isOpenLogin: false }),
  onCloseRegister: () => set({ isOpenRegister: false }),
  onOpenLogin: () => set({ isOpenLogin: true, isOpenRegister: false }),
  onCloseLogin: () => set({ isOpenLogin: false }),
  data: {},
  setData: (data) => set({ data: { data } }),
  setIsProps: () => set((state) => ({ isProps: !state.isProps })),
}));
