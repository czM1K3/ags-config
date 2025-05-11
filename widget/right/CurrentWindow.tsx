import { bind } from "astal";
import { hyprland } from "../../helpers/globals";

export function CurrentWindow(): JSX.Element {
  const client = bind(hyprland, "focusedClient");

  return (
    <label
      visible={bind(client).as((x) => x?.xwayland)}
      label="X"
      className="part"
    />
  )
}
