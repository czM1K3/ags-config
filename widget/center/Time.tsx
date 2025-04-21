import { Variable } from "astal";

const time = Variable("").poll(1000, 'env LC_ALL=cs_CZ.utf8 date "+%e.%B %H:%M"');

export function Time(): JSX.Element {
  return (
    <label className="part" label={time()} />
  );
}
