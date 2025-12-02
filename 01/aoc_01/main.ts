// for neovim: :lua for _,c in pairs(vim.lsp.get_clients()) do if c.name=="ts_ls" then c.stop() end end

import { PaswordRotationReader } from "./file-reader.ts";
import { PasswordDial } from "./password-dial.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  let zeroCnt = 0;
  const reader = new PaswordRotationReader();
  const dial = new PasswordDial();
  const commands = await reader.read("../input.txt");
  const input = Number(prompt("Please enter value to start: ", "50"));
  let cursor: number = input;
  for (const command of commands) {
    if (!command) continue;
    const directionAndAmount: [string, number] = reader.getDirectionAndAmount(
      command,
    );
    cursor = dial.computeStep(
      directionAndAmount[0],
      directionAndAmount[1],
      cursor,
    );
    if (cursor < 0 || cursor > 99) {
      throw new Error("Out of bounds");
    }
    if (cursor === 0) zeroCnt += 1;
  }
  console.log("The password is: ", zeroCnt);
}
