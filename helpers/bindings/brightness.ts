import { exec } from "astal";
import GObject, { register, property } from "astal/gobject";
import { monitorFile, readFileAsync } from "astal/file";

@register({ GTypeName: "Brightness" })
export default class Brightness extends GObject.Object {
  static instance: Brightness;
  static get_default() {
    if (!this.instance) this.instance = new Brightness();
    return this.instance;
  }

  #screenMax = 0;
  #screen = 0;
  #hasBrightness = false;

  @property(Number)
  get screen() {
    return this.#screen;
  }

  @property(Boolean)
  get has() {
    return this.#hasBrightness;
  }

  constructor() {
    super();

    const screen = exec(`bash -c "ls -w1 /sys/class/backlight | head -1"`);
    if (screen.length > 0) {
      this.#hasBrightness = true;
      this.notify("has");
      this.#screenMax = Number(exec(`brightnessctl max`));
      this.#screen =
        Number(exec("brightnessctl get")) / Number(exec("brightnessctl max")) ||
        0;

      const screenPath = `/sys/class/backlight/${screen}/brightness`;

      monitorFile(screenPath, async (f) => {
        const v = await readFileAsync(f);
        this.#screen = Number(v) / this.#screenMax;
        this.notify("screen");
      });
    }
  }
}
