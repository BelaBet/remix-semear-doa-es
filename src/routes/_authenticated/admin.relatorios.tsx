import { createFileRoute } from "@tanstack/react-router";
import { DonationsReport } from "@/components/donations/DonationsReport";

export const Route = createFileRoute("/_authenticated/admin/relatorios")({
  component: AdminRelatorios,
  head: () => ({ meta: [{ title: "Relatórios" }] }),
});

function AdminRelatorios() {
  return <DonationsReport />;
}
