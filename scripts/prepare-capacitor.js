import fs from "fs-extra";

fs.copySync("out", "out_filtered", {
  filter: (src) => !src.includes("apps"),
});
