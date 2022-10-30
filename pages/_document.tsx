import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en-US" dir="ltr">
        <Head>
          <link rel="icon" href="/assets/images/favicon/favicon-32x32.png" type="image/x-icon"/>
          <link rel="shortcut icon" href="/assets/images/favicon/favicon-32x32.png" sizes="32x32"/>
          <link rel="apple-touch-icon" href="/assets/images/favicon/apple-touch-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/favicon/apple-touch-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/favicon/apple-touch-icon-114x114.png"/>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}