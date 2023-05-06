import * as dotenv from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

await dotenv.config({
  export: true,
  // .env.exampleと、.env+通常の環境変数を比較して不足がないかチェック
  safe: true,
  example: "./.env.example",
  path: "./.env",
});

const config = Deno.env.toObject();

export const ENV = {
  TODOIST_TOKEN: config["TODOIST_TOKEN"],
};
