import type { ReactNode } from 'react';

interface LayoutProps {
  readonly className?: string;
  readonly children: React.ReactNode | React.ReactNode[];
}

export function Layout(props: LayoutProps): ReactNode {
  return <div className={props.className}>{props.children}</div>;
}

interface HeaderProps {
  readonly className?: string;
  readonly children: React.ReactNode | React.ReactNode[];
}

export function Header(props: HeaderProps): ReactNode {
  return (
    <div
      className={`ios-safe-top sticky top-0 left-0 right-0 ${props.className}`}
    >
      <div className="ios-safe-left ios-safe-right">{props.children}</div>
    </div>
  );
}

interface ContentProps {
  readonly className?: string;
  readonly children: React.ReactNode | React.ReactNode[];
}

export function Content(props: ContentProps): ReactNode {
  return (
    <div className={`ios-safe-left ios-safe-right ${props.className}`}>
      {props.children}
    </div>
  );
}

interface FooterProps {
  readonly className?: string;
  readonly children: React.ReactNode | React.ReactNode[];
}

export function Footer(props: FooterProps): ReactNode {
  return (
    <div
      className={`ios-safe-bottom sticky bottom-0 left-0 right-0 ${props.className}`}
    >
      <div className="ios-safe-left ios-safe-right">{props.children}</div>
    </div>
  );
}

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
