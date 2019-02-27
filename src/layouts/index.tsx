import React, { ReactNode, SFC } from 'react';

type Props = { children: ReactNode };

const Layout: SFC<Props> = ({ children }) => <div>layout:{children}</div>;

export default Layout;
