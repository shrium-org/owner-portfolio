import { Component, inject } from '@angular/core';
import { Navbar } from '../../core/components/navbar/navbar';
import { Dock } from '../../core/components/dock/dock';
import { WindowManager } from '../../core/services/window-manager';
import { ContactWindow } from "../../core/components/contact-window/contact-window";
import { FinderWindow } from "../../core/components/finder-window/finder-window";
import { TerminalWindow } from "../../core/components/terminal-window/terminal-window";

@Component({
  selector: 'app-home',
  imports: [Navbar, Dock, ContactWindow, FinderWindow, TerminalWindow],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  windowManager = inject(WindowManager);
}