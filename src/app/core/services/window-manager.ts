import { Injectable, signal, computed } from '@angular/core';

export type WindowId =
  | 'finder'
  | 'contact'
  | 'resume'
  | 'safari'
  | 'photos'
  | 'terminal'
  | 'txtfile'
  | 'imgfile';

export interface WindowState {
  isOpen: boolean;
  zIndex: number;
  data: any;
}

const INITIAL_Z_INDEX = 1000;

const createInitialState = (): Record<WindowId, WindowState> => ({
  finder:   { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact:  { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume:   { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari:   { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos:   { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile:  { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile:  { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
});

@Injectable({ providedIn: 'root' })
export class WindowManager {
  private topZIndex = INITIAL_Z_INDEX;

  windows = signal<Record<WindowId, WindowState>>(createInitialState());

  /** id of whichever open window currently has the highest z-index */
  focusedId = computed<WindowId | null>(() => {
    const open = (Object.entries(this.windows()) as [WindowId, WindowState][])
      .filter(([, w]) => w.isOpen);

    if (!open.length) return null;

    return open.reduce((top, cur) => (cur[1].zIndex > top[1].zIndex ? cur : top))[0];
  });

  isOpen(id: WindowId): boolean {
    return this.windows()[id].isOpen;
  }

  isFocused(id: WindowId): boolean {
    return this.focusedId() === id;
  }

  open(id: WindowId, data: any = null) {
    this.topZIndex += 1;
    this.windows.update(state => ({
      ...state,
      [id]: { ...state[id], isOpen: true, zIndex: this.topZIndex, data: data ?? state[id].data },
    }));
  }

  close(id: WindowId) {
    this.windows.update(state => ({
      ...state,
      [id]: { ...state[id], isOpen: false },
    }));
  }

  focus(id: WindowId) {
    if (!this.isOpen(id)) return;
    this.topZIndex += 1;
    this.windows.update(state => ({
      ...state,
      [id]: { ...state[id], zIndex: this.topZIndex },
    }));
  }

  /** the macOS dock-click behavior */
  toggle(id: WindowId, data: any = null) {
    const win = this.windows()[id];

    if (!win.isOpen) {
      this.open(id, data);
      return;
    }

    if (this.isFocused(id)) {
      this.close(id);
      return;
    }

    this.focus(id);
  }
}