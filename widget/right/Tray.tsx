import { bind, Variable } from "astal";
import { tray } from "../../helpers/globals";
import Astal from "gi://Astal?version=3.0";
import AstalTray from "gi://AstalTray?version=0.1";

export function Tray(): JSX.Element {
  return (
    <box className="part">
      {bind(tray, "items").as((items) => items.map((item) => <TrayItem item={item} />))}
    </box>
  );
}

type TrayItemProps = {
  item: AstalTray.TrayItem;
};

function TrayItem({ item }: TrayItemProps): JSX.Element {

  // Blacklist
  if (["spotify", "Thunderbird Daily"].includes(item.get_title()))
    return (
      <box></box>
    );

  return (
    <menubutton
      className="trayitem"
      tooltipMarkup={bind(item, "tooltipMarkup")}
      usePopover={false}
      actionGroup={bind(item, "actionGroup").as((ag) => ["dbusmenu", ag])}
      menuModel={bind(item, "menuModel")}
      tooltipText={bind(item, "title")}
      onButtonPressEvent={(menuButton, e) => {
        const [__, button] = e.get_button();
        if (button === 3) {
          const [___, x, y] = e.get_root_coords();
          item.activate(x, y);
        }
      }}
    >
      <icon gicon={bind(item, "gicon")} />
    </menubutton>
  );
}
