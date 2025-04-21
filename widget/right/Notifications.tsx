import { bind, execAsync, Variable } from "astal";
import { hyprland, notifications } from "../../helpers/globals";
import { Astal, Gtk } from "astal/gtk3";

export function Notifications(): JSX.Element {
  return (
    <button
      className="part"
      onButtonPressEvent={async (_, e) => {
        const [__, button] = e.get_button();
        switch (button) {
          case 1:
            execAsync("swaync-client -t -sw");
            break;
          case 3:
            execAsync("swaync-client -d -sw");
            break;
        }
      }}
      visible={bind(notifications).as((x) => x.count >= 1)}
    >
      <box>
        <label className="notification" label={bind(notifications).as((x) => x.dnd ? "" : "")} />
        <label label={bind(notifications).as((x) => x.count.toString())} marginTop={1} />
      </box>
    </button>
  );
}
