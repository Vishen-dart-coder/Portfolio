import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Vishen Sharma',
  description: 'Thoughts on coding, learning, and building production software.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
