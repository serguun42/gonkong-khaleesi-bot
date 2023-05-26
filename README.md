# Gonkong Khaleesi bot

Comment bot for Gonkong platform to mock users. Based on [Khaleesi-JS](https://github.com/serguun42/Khaleesi-JS). Should be triggered by webhook to check mentioning comments and then send replies.

## Config

See [configs.d.ts](./types/configs.d.ts) for type definitions of all parameters with comments, then edit an examples of [tokens.json](./config/tokens.json) and [urls.json](./config/urls.json).

## Commands

1. Install only necessary dependencies – `npm i --production`
2. Compile Typescript – `npm run compile`
3. Run in production mode – `npm run production`

## Development

- Install all dependencies – `npm i`
- Run in dev mode with watch-reload – `npm run dev`
- Check with ESLint – `npm run lint`

---

### [BSL-1.0 License](./LICENSE)
