// for neovim: :lua for _,c in pairs(vim.lsp.get_clients()) do if c.name=="ts_ls" then c.stop() end end

import { Counter } from "./counter.ts";
import { PaswordRotationReader } from "./file-reader.ts";
import { PasswordDial } from "./password-dial.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const reader = new PaswordRotationReader();
  const counter = new Counter();
  const commands = await reader.read("../input.txt");
  const input = Number(prompt("Please enter value to start: ", "50"));
  const dial = new PasswordDial(input, counter);
  for (const command of commands) {
    if (!command) continue;
    const directionAndAmount: [string, number] = reader.getDirectionAndAmount(
      command,
    );
    dial.computeStep(
      directionAndAmount[0],
      directionAndAmount[1],
    );
  }
  console.log("The password is: ", counter.count);
}
