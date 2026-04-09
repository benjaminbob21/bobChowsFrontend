import { GroupOrder } from "@/types";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CheckCircle, Copy } from "lucide-react";

type Props = {
  shareableLink: string;
  groupOrder: GroupOrder;
}

export const ShareGroupOrder = ({shareableLink, groupOrder}:Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const remainingSpots =
    groupOrder.totalParticipants - groupOrder.paidParticipants.length;

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Share Group Order</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 text-center">
              Share this link with your group:
            </p>
            <p className="text-sm font-bold text-gray-600 mb-2 text-center">
              Keep this link safe!
            </p>
            <div className="flex gap-2">
              <Input value={shareableLink} readOnly className="flex-1" />
              <Button onClick={copyToClipboard}>
                {copied ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="font-medium">Order Status:</p>
            <p>{remainingSpots} spot(s) remaining</p>
            <p>{groupOrder.paidParticipants.length} participant(s) have paid</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
