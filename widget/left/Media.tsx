import { bind, execAsync } from "astal";
import { media } from "../../helpers/globals";

export function Media(): JSX.Element {
  return (
    <button
      className="part"
      visible={bind(media).as((x) => Boolean(x))}
      onButtonPressEvent={async (_, e) => {
        const [__, button] = e.get_button();
        switch(button) {
          case 1: // Left
            execAsync("waybar-mpris --send toggle");
            break;
          case 2: // Middle
            break;
          case 3: // Right
            execAsync("hyprctl dispatch togglespecialworkspace spotify");
            break;
        }
      }}
      onScroll={async (_, e) => {
        if (e.delta_y < 0) {
          execAsync("waybar-mpris --send prev");
        } else if (e.delta_y > 0) {
          execAsync("waybar-mpris --send next");
        }
      }}
    >
      <label label={bind(media).as((x) => !x ? "" : x)} />
    </button>
  );
}
