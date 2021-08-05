import { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
      "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  * {
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5, h6 {
    color: white;
  }

  a:hover {
    color: #282c34;
    background: white;
  }
`;
