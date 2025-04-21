import { App, Gdk, Gtk } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./widget/Bar";
import { hyprland } from "./helpers/globals";

App.start({
  css: style,
  main() {
    const bars = new Map<Gdk.Monitor, Gtk.Widget>();
    for (const gdkmonitor of App.get_monitors()) {
      bars.set(gdkmonitor, Bar(gdkmonitor));
    }

    App.connect("monitor-added", (_, gdkmonitor) => {
      bars.set(gdkmonitor, Bar(gdkmonitor));
    });

    App.connect("monitor-removed", (_, gdkmonitor) => {
      bars.get(gdkmonitor)?.destroy();
      bars.delete(gdkmonitor);
    });

    hyprland.connect("client-added", async (_, client) => {
      if (client.get_initial_title() === "Zen Browser") {
        await new Promise(r => setTimeout(r, 1000));
        client.toggle_floating();
        client.toggle_floating();
      }
    });
  },
});
