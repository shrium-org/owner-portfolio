import { Component, inject } from '@angular/core';
import { Navbar } from '../../core/components/navbar/navbar';
import { Dock } from '../../core/components/dock/dock';
import { WindowManager } from '../../core/services/window-manager';
import { ContactWindow } from "../../core/components/contact-window/contact-window";
import { FinderWindow } from "../../core/components/finder-window/finder-window";
import { TerminalWindow } from "../../core/components/terminal-window/terminal-window";
import { SafariWindow } from "../../core/components/safari-window/safari-window";
import { ResumeWindow } from "../../core/components/resume-window/resume-window";
import { SettingsWindow } from "../../core/components/settings-window/settings-window";
import { PhotosWindow } from '../../core/components/photos-window/photos-window';

@Component({
  selector: 'app-home',
  imports: [Navbar, Dock, ContactWindow, FinderWindow, TerminalWindow, SafariWindow, ResumeWindow, SettingsWindow, PhotosWindow],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  windowManager = inject(WindowManager);
}