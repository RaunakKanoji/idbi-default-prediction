import { BorrowerProfile } from "@/components/risk-platform";

export default async function BorrowerTabPage({ params }: { params: Promise<{ msmeId: string; tab: string }> }) {
  const { msmeId, tab } = await params;
  return <BorrowerProfile id={msmeId} tab={tab} />;
}
