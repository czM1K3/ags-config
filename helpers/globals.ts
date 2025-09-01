import { Variable } from "astal";
import Hyprland from "gi://AstalHyprland";
import Bluetooth from "gi://AstalBluetooth";
import Tray from "gi://AstalTray";
import Battery from "gi://AstalBattery";
import Wp from "gi://AstalWp";
import Brightness from "./bindings/brightness";
export { default as config } from "../config.json";

export const hyprland = Hyprland.get_default();
export const bluetooth = Bluetooth.get_default();
export const tray = Tray.get_default();
export const battery = Battery.get_default();
export const wp = Wp.get_default();
export const brightness = Brightness.get_default();

export const media = Variable("").watch(
  [
    "bash",
    "-c",
    "waybar-mpris --autofocus --pause 󰏤 --play 󰐊 --order 'SYMBOL:ARTIST:TITLE'",
  ],
  (out) => {
    try {
      return JSON.parse(out.replace(/\\/g, "\\\\"))["text"];
    } catch (e: unknown) {
      return "ERROR: " + out;
    }
  },
);

const gameModeRegex = /^variant\s{0,}int32\s{0,}(\d{1,})$/;
export const gamemode = Variable(0).watch(
  [
    "bash",
    "-c",
    "dbus-monitor --session \"type='signal',interface='org.freedesktop.DBus.Properties',sender='com.feralinteractive.GameMode',path='/com/feralinteractive/GameMode'\"",
  ],
  (out) => {
    const result = out.match(gameModeRegex);
    if (result === null || result.length !== 2) return gamemode.get();
    return parseInt(result[1]);
  },
);

export type CustomNotificationsType = {
  dnd: boolean;
  count: number;
};
export const notifications = Variable<CustomNotificationsType>({ count: 0, dnd: false }).watch(
  ["bash", "-c", "swaync-client -s"],
  (out) => {
    const parsed = JSON.parse(out);
    // return `${parsed["dnd"] ? "" : ""}${parsed["count"] > 0 ? " " : ""}`;
    return {
      count: parsed["count"],
      dnd: parsed["dnd"],
    };
  },
);
