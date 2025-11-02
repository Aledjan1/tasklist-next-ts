import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Task List',
  description: 'Simple Task List with localStorage',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
