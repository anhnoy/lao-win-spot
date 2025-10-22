import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LotteryCardProps {
  title: string;
  type: string;
  closingTime: string;
  prize: string;
  status: "open" | "closed";
}

const LotteryCard = ({ title, type, closingTime, prize, status }: LotteryCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div
        className="relative h-32 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.imgur.com/X14lxZe.jpg')" }}
      >
        {/* Overlay สีดำโปร่งใส */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center">
          <h3 className="text-2xl font-bold text-primary-foreground font-thai">{title}</h3>
          <p className="text-sm text-primary-foreground/80 mt-1">{type}</p>
        </div>

        {status === "closed" && (
          <Badge className="absolute top-3 right-3 bg-destructive">
            ปิดรับแทง
          </Badge>
        )}
        {status === "open" && (
          <Badge className="absolute top-3 right-3 bg-success">
            เปิดรับแทง
          </Badge>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>ปิดรับ: {closingTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium">รางวัลสูงสุด:</span>
          <span className="text-lg font-bold bg-gradient-gold bg-clip-text text-transparent">
            {prize}
          </span>
        </div>

        <Button 
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          disabled={status === "closed"}
        >
          {status === "open" ? "ซื้อหวย" : "ปิดรับแทง"}
        </Button>
      </div>
    </Card>
  );
};

export default LotteryCard;
