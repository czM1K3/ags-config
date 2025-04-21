import { bind, execAsync } from "astal";
import { battery } from "../../helpers/globals";

export function Battery(): JSX.Element {
  return (
    <button className="part" visible={bind(battery, "isPresent")} onButtonPressEvent={async (_, e) => {
      const [__, button] = e.get_button();
      if (button === 1) {
        await execAsync("hyprctl dispatch -- exec [float] alacritty -e battop");
      }
    }}>
      <box className="battery" spacing={4}>
        {/* <icon icon={bind(battery, "batteryIconName")} /> */}
        <label label={bind(battery, "charging").as((x) => x ? "󰂄" : "󰁹")} />
        <overlay widthRequest={80} className={bind(battery, "charging").as((x) => x ? "charging" : "discharging")}>
          <levelbar
            widthRequest={80}
            heightRequest={15}
            value={bind(battery, "percentage")}
            className={bind(battery, "percentage").as((v) => v < 0.2 ? "low" : "normal")}
          />
          <label
            label={bind(battery, "percentage").as((p) => `${Math.floor(p * 100)}%`)}
          />
        </overlay>
      </box>
    </button>
  );
}
