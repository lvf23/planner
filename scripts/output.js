import { execSync } from "child_process";

const now = new Date();
const timestamp =
  now.getFullYear().toString() +
  "-" +
  String(now.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(now.getDate()).padStart(2, "0") +
  "_" +
  String(now.getHours()).padStart(2, "0") +
  "-" +
  String(now.getMinutes()).padStart(2, "0") +
  "-" +
  String(now.getSeconds()).padStart(2, "0");

execSync(`npm run main > output/output-${timestamp}.txt`, { stdio: "inherit" });
