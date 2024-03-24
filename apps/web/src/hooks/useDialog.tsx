import { create } from 'zustand';

interface DialogProps {
  isOpenRegister: boolean;
  isOpenLogin: boolean;
  onOpenRegister: () => void;
  onCloseRegister: () => void;
  onOpenLogin: () => void;
  onCloseLogin: () => void;
  data: any;
  setData(data: any): void;
}

export const useDialog = create<DialogProps>((set) => ({
  isOpenRegister: false,
  isOpenLogin: false,
  onOpenRegister: () => set({ isOpenRegister: true }),
  onCloseRegister: () => set({ isOpenRegister: false }),
  onOpenLogin: () => set({ isOpenLogin: true }),
  onCloseLogin: () => set({ isOpenLogin: false }),
  data: {},
  setData: (data) => set({ data: { data } }),
}));
