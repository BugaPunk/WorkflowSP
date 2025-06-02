import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>WorkflowS</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/dark-theme.css" />
        <link rel="stylesheet" href="/light-theme.css" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <script src="/theme.js"></script>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
