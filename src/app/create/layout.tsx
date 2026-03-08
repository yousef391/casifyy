import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'أنشئي غطائك | Create Your Case',
  description:
    'صممي غطاء هاتفك المخصص — اختاري الموديل، ارفعي صورتك، واطلبي بسهولة. توصيل لكل ولايات الجزائر. Créez votre coque personnalisée en 3 étapes.',
  openGraph: {
    title: 'أنشئي غطائك المخصص — CASIFY',
    description: 'صممي غطاء هاتفك بـ 3 خطوات بسيطة',
    url: 'https://casify.dz/create',
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
