import { Component, inject } from '@angular/core';
import { Navbar } from '../../core/component/navbar/navbar';
import { Dock } from '../../core/component/dock/dock';
import { WindowManager } from '../../core/services/window-manager';
import { ContactWindow } from "../../core/component/contact-window/contact-window";
import { FinderWindow } from "../../core/component/finder-window/finder-window";
import { TerminalWindow } from "../../core/component/terminal-window/terminal-window";
import { SafariWindow } from "../../core/component/safari-window/safari-window";
import { ResumeWindow } from "../../core/component/resume-window/resume-window";
import { SettingsWindow } from "../../core/component/settings-window/settings-window";
import { PhotosWindow } from '../../core/component/photos-window/photos-window';
import { AppearanceService } from '../../core/services/appearance.service';
import { NotepadWindow } from "../../core/component/notepad-window/notepad-window";

@Component({
  selector: 'app-home',
  imports: [Navbar, Dock, ContactWindow, FinderWindow, TerminalWindow, SafariWindow, ResumeWindow, SettingsWindow, PhotosWindow, NotepadWindow],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  windowManager = inject(WindowManager);

  appearance = inject(AppearanceService);
}