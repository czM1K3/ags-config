import { bind, execAsync } from "astal";
import { wp, config } from "../../helpers/globals";

export function Microphone(): JSX.Element {
  const microphone = wp?.defaultMicrophone!;

  return (
    <button
      className="part"
      onButtonPressEvent={async (_, e) => {
        const [__, button] = e.get_button();
        if (button === 1) {
          await execAsync("pavucontrol");
        }
      }}
      visible={config.showMicrophone}
    >
      <label label={bind(microphone, "mute").as((x) => x ? "󰍭" : "󰍬")} />
    </button>
  );
}
