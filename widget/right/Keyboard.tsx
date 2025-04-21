import { bind, Variable } from "astal";
import { hyprland } from "../../helpers/globals";

export function Keyboard(): JSX.Element {
  const layout = Variable("🇺🇸");

  const conn = hyprland.connect("keyboard-layout", (_, __, x) => {
    layout.set(x !== "Czech (QWERTY)" ? "🇺🇸" : "🇨🇿");
  });

  return (
    <box className="part" onDestroy={() => hyprland.disconnect(conn)}>
      <label label={bind(layout)} />
    </box>
  );
}
