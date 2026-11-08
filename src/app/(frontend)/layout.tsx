import React from 'react'
import './styles.css'
import './account.css'

export const metadata = {
  description: 'GetGive makes gift lists and exchanges easier for everyone.',
  title: 'GetGive — Gift lists, together',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{props.children}</main>
      </body>
    </html>
  )
}
