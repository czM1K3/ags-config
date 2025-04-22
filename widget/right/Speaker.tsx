import { bind, execAsync } from "astal";
import { wp, config } from "../../helpers/globals";

export function Speaker(): JSX.Element {
  const speaker = wp?.audio.defaultSpeaker!;

  return (
    <button
      className="part"
      onButtonPressEvent={async (_, e) => {
        const [__, button] = e.get_button();
        if (button === 1) {
          await execAsync("pavucontrol");
        }
      }}
      visible={config.showSpeaker}
    >
      <box spacing={12}>
        <label label={bind(speaker, "mute").as((x) => x ? "" : "")} />
        <overlay widthRequest={80} className="speaker">
          <levelbar
            widthRequest={80}
            heightRequest={15}
            value={bind(speaker, "volume").as((x) => Math.min(x, 1))}
            className={bind(speaker, "mute").as((x) => x ? "mute" : "normal")}
          />
          <label
            label={bind(speaker, "volume").as((p) => `${Math.floor(p * 100)}%`)}
          />
        </overlay>
      </box>
    </button>
  );
}
