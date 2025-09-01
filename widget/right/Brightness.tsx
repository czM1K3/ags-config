import { bind, execAsync } from "astal";
import { brightness } from "../../helpers/globals";

export function Brightness(): JSX.Element {
  return (
    <box className="part" spacing={12} visible={bind(brightness, "has")}>
      <label label="󰃟" />
      <overlay widthRequest={80} className="brightness">
        <levelbar
          widthRequest={80}
          heightRequest={15}
          value={bind(brightness, "screen").as((x) => Math.min(x, 1))}
          // className={bind(speaker, "mute").as((x) => x ? "mute" : "normal")}
        />
        <label
          label={bind(brightness, "screen").as((p) => `${Math.floor(p * 100)}%`)}
        />
      </overlay>
    </box>
  );
}
