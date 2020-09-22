const shader = require("shader");

export function shade(color: string): string {
  return shader(color, -0.09);
}
