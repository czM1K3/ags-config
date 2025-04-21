import { bind, Variable } from "astal";
import { gamemode, hyprland } from "../../helpers/globals";

export function Gamemode(): JSX.Element {
  return (
    <box className="part" visible={bind(gamemode).as((x) => x !== 0)}>
      <label label={bind(gamemode).as((x) => `󰺷  ${x}`)} />
    </box>
  );
}
