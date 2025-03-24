## Install dependencies
Installed dependencies with `npm install` (or `pnpm install` or `yarn`)

## Running svelte app
Start a development server:

```bash
# app by default available on http://localhost:5173/
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Rum playwright tests via VS code
Install VS Code Playwright plugin https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright


Add [✓] **Run global setup on each run** checkbox in Playwright VS Code plugin and run tests via Test Eplorer

Additional options
- [✓] **Show browser** < Run tests in headed mode
- [✓] **Show trace viewer** < Run in debug mode
```bash
# Playwright webserver configured to run on 'http://localhost:4173'
	webServer: {
		command: 'npm run build && npm run preview',
		 url: 'http://localhost:4173'
	}
```

## Run playwright tests via cli
Please refer to https://playwright.dev/docs/test-cli
```bash
# Make sure port 4173 is not in use
npx playwright test
```
## Generate report
Please refer to https://playwright.dev/docs/test-reporters
```bash
# HTML report will be available on http://localhost:9323/
npx playwright test --reporter=html
npx playwright show-report
```