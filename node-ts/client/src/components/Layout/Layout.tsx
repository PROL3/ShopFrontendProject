import type { PropsWithChildren } from 'react';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div className="flex h-screen flex-col ">
      <Header />

      <div className="flex flex-1">
        <Sidebar />
        <Main>{children}</Main>
      </div>
    </div>
  );
}
