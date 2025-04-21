import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Workspaces } from "./left/Workspaces";
import { Time } from "./center/Time";
import { Media } from "./left/Media";
import { Keyboard } from "./right/Keyboard";
import { Tray } from "./right/Tray";
import { Gamemode } from "./right/Gamemode";
import { Notifications } from "./right/Notifications";
import { Bluetooth } from "./right/Bluetooth";
import { Battery } from "./right/Battery";
import { Speaker } from "./right/Speaker";
import { Microphone } from "./right/Microphone";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      className="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox orientation={Gtk.Orientation.HORIZONTAL}>
        <box halign={Gtk.Align.START}>
          <Workspaces monitor={gdkmonitor} />
          <Media />
        </box>
        <box halign={Gtk.Align.CENTER}>
          <Time />
        </box>
        <box halign={Gtk.Align.END}>
          <Bluetooth />
          <Keyboard />
          <Speaker />
          <Microphone />
          <Battery />
          <Tray />
          <Gamemode />
          <Notifications />
        </box>
      </centerbox>
    </window>
  );
}
