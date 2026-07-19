import { BorrowerProfile } from "@/components/risk-platform";

export default async function BorrowerPage({ params }: { params: Promise<{ msmeId: string }> }) {
  const { msmeId } = await params;
  return <BorrowerProfile id={msmeId} />;
}
