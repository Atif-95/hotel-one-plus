import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin CRM | Hotel One Plus",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}