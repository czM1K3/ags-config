import { bind, Binding, execAsync, Variable } from "astal";
import { hyprland } from "../../helpers/globals";
import AstalHyprland from "gi://AstalHyprland";
import { Gdk } from "astal/gtk3";

type WorkspacesProps = {
  monitor: Gdk.Monitor;
};

function SingleWorkspace(workspace: AstalHyprland.Workspace, currentId: Binding<number>) {
  return (
    <button className="workspace" onClicked={async () => {
      await execAsync(`hyprctl dispatch workspace ${workspace.id}`);
    }}>
      <label label={`${workspace.id}`} className={currentId.as((x) => x === workspace.id? "focused" : "unfocused")} />
    </button>
  );
}

export function Workspaces({ monitor }: WorkspacesProps): JSX.Element {
  const currentId = bind(hyprland, "focusedWorkspace").as((x) => x?.id ?? 1);
  return (
    <box className="part" spacing={4}>
      {bind(hyprland, "workspaces").as((w) => w
        .filter((x) => (!(x.id >= -99 && x.id <= -2)))
        .sort((a, b) => a.id - b.id)
        .map((x) => SingleWorkspace(x, currentId))
      )}
    </box>
  );
}
