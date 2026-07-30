const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("kvr", {
  version: "1.0.0",
  platform: process.platform,
  electron: process.versions.electron,
  node: process.versions.node,
  chrome: process.versions.chrome,
});