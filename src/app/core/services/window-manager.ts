import { Injectable, signal, computed } from '@angular/core';

export type WindowId =
  | 'finder'
  | 'contact'
  | 'resume'
  | 'safari'
  | 'photos'
  | 'terminal'
  | 'txtfile'
  | 'imgfile'
  | 'settings'
  | 'notepad'
  ;

export interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  data: any;
}

const INITIAL_Z_INDEX = 1000;

const createInitialState = (): Record<WindowId, WindowState> => ({
  finder:   { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact:  { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume:   { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari:   { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos:   { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile:  { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile:  { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  settings: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
  notepad:  { isOpen: true, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },

});

@Injectable({ providedIn: 'root' })
export class WindowManager {
  private topZIndex = INITIAL_Z_INDEX;

  windows = signal<Record<WindowId, WindowState>>(createInitialState());

  /** id of whichever open, non-minimized window currently has the highest z-index */
  focusedId = computed<WindowId | null>(() => {
    const open = (Object.entries(this.windows()) as [WindowId, WindowState][])
      .filter(([, w]) => w.isOpen && !w.isMinimized);

    if (!open.length) return null;

    return open.reduce((top, cur) => (cur[1].zIndex > top[1].zIndex ? cur : top))[0];
  });

  isOpen(id: WindowId): boolean {
    return this.windows()[id].isOpen;
  }

  isMinimized(id: WindowId): boolean {
    return this.windows()[id].isMinimized;
  }

  isFocused(id: WindowId): boolean {
    return this.focusedId() === id;
  }

  open(id: WindowId, data: any = null) {
    this.topZIndex += 1;
    this.windows.update(state => ({
      ...state,
      [id]: { ...state[id], isOpen: true, isMinimized: false, zIndex: this.topZIndex, data: data ?? state[id].data },
    }));
  }

  close(id: WindowId) {
    this.windows.update(state => ({
      ...state,
      [id]: { ...state[id], isOpen: false, isMinimized: false },
    }));
  }

  focus(id: WindowId) {
    if (!this.isOpen(id) || this.isMinimized(id)) return;
    this.topZIndex += 1;
    this.windows.update(state => ({
      ...state,
      [id]: { ...state[id], zIndex: this.topZIndex },
    }));
  }

  minimize(id: WindowId) {
    if (!this.isOpen(id)) return;
    this.windows.update(state => ({
      ...state,
      [id]: { ...state[id], isMinimized: true },
    }));
  }

  /** restore from the dock/taskbar and bring to front */
  restore(id: WindowId) {
    if (!this.isOpen(id)) return;
    this.topZIndex += 1;
    this.windows.update(state => ({
      ...state,
      [id]: { ...state[id], isMinimized: false, zIndex: this.topZIndex },
    }));
  }

  /** the macOS dock-click behavior */
  toggle(id: WindowId, data: any = null) {
    const win = this.windows()[id];

    if (!win.isOpen) {
      this.open(id, data);
      return;
    }

    if (win.isMinimized) {
      this.restore(id);
      return;
    }

    if (this.isFocused(id)) {
      this.close(id);
      return;
    }

    this.focus(id);
  }
}