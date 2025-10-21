import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { LotteryType } from "@/types/lottery";

interface LotteryTypeSelectorProps {
  lotteryTypes: LotteryType[];
  selectedLottery: LotteryType;
  onSelectLottery: (lottery: LotteryType) => void;
}

const LotteryTypeSelector = ({
  lotteryTypes,
  selectedLottery,
  onSelectLottery,
}: LotteryTypeSelectorProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold font-thai mb-4">เลือกประเภทหวย</h2>
      <div className="grid gap-3">
        {lotteryTypes.map((lottery) => (
          <div
            key={lottery.id}
            onClick={() => lottery.status === "open" && onSelectLottery(lottery)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedLottery.id === lottery.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            } ${lottery.status === "closed" ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold font-thai">{lottery.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ปิดรับ {lottery.closing} น.
                  </span>
                  <span className="text-accent font-semibold">จ่าย {lottery.prize}</span>
                </div>
              </div>
              <Badge className={lottery.status === "open" ? "bg-success" : "bg-destructive"}>
                {lottery.status === "open" ? "เปิดรับ" : "ปิดรับ"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LotteryTypeSelector;
