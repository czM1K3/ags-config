import { bind, execAsync } from "astal";
import { bluetooth } from "../../helpers/globals";
import type AstalBluetooth from "gi://AstalBluetooth?version=0.1";

export function Bluetooth(): JSX.Element {
  return (
    <button
      className="part"
      visible={bind(bluetooth, "isPowered")}
      onButtonPressEvent={async (menuButton, e) => {
        const [__, button] = e.get_button();
        if (button === 1) {
          execAsync("blueberry");
        }
      }}
    >
      <box>
        <icon
          icon={bind(bluetooth, "isPowered").as(
            (x) => `bluetooth-${x ? "active" : "disabled"}-symbolic`,
          )}
        />
        <box className="bluetooth">
          {bind(bluetooth, "devices").as((devices) =>
            devices.map((device) => <BluetoothItem device={device} />),
          )}
        </box>
      </box>
    </button>
  );
}

type BluetoothItemProps = {
  device: AstalBluetooth.Device;
};

function BluetoothItem({ device }: BluetoothItemProps): JSX.Element {
  return (
    <icon
      icon={bind(device, "icon").as((x) => {
        switch (x) {
          case "input-gaming":
            return "input-gamepad-symbolic";
          default:
            return x ?? "";
        }
      })}
      tooltipText={bind(device, "name")}
      visible={bind(device, "connected")}
    />
  );
}
