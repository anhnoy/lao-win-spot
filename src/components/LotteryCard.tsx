import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import lotteryBg from "@/assets/lottery-bg.png";

interface LotteryCardProps {
  title: string;
  type: string;
  closingTime: string;
  prize: string;
  status: "open" | "closed";
}

const LotteryCard = ({ title, type, closingTime, prize, status }: LotteryCardProps) => {
  const today = new Date();
  const dateStr = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  
  return (
    <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${lotteryBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-teal-900/40 to-blue-900/40" />
      
      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-yellow-400/60"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-yellow-400/60"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-yellow-400/60"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-yellow-400/60"></div>

      {/* Top decorative pattern */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full flex items-center justify-center gap-4 px-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        <div className="text-yellow-400 text-xs tracking-widest">⟨ ◆ ⟩</div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      </div>

      {/* Status Badge */}
      {status === "closed" ? (
        <Badge className="absolute top-6 right-6 bg-red-600/90 text-white border-red-400 z-10">
          ปิดรับแทง
        </Badge>
      ) : (
        <Badge className="absolute top-6 left-6 bg-green-600/90 text-white border-green-400 z-10 animate-pulse">
          เปิดรับแทง
        </Badge>
      )}

      <div className="relative p-8 space-y-6">
        {/* Header with Logo placeholder */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/20 border-2 border-yellow-400 mb-2">
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-yellow-400 tracking-wider font-thai drop-shadow-lg">
            WIN-LOTTERY
          </h2>
        </div>

        {/* Date Information */}
        <div className="bg-black/20 border border-yellow-400/40 rounded p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-yellow-300">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">KỲ QUAY: {dateStr}</span>
          </div>
          <div className="text-yellow-300 text-sm">
            NGÀY XỔ: {dateStr}
          </div>
        </div>

        {/* Lottery Title */}
        <div className="text-center py-2">
          <h3 className="text-2xl font-bold text-white font-thai drop-shadow-md">{title}</h3>
          <p className="text-yellow-200/80 text-sm mt-1">{type}</p>
        </div>

        {/* Prize Display */}
        <div className="bg-black/30 border-2 border-yellow-400/60 rounded-lg p-4 text-center">
          <p className="text-yellow-400 text-sm mb-2 tracking-wider">รางวัลสูงสุด</p>
          <p className="text-4xl font-bold text-yellow-300 tracking-wider drop-shadow-lg">
            {prize}
          </p>
        </div>

        {/* Closing Time */}
        <div className="flex items-center justify-center gap-2 text-yellow-200/90 text-sm">
          <span>ปิดรับ:</span>
          <span className="font-semibold text-yellow-300">{closingTime}</span>
        </div>

        {/* Buy Button */}
        <Button 
          className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-300"
          disabled={status === "closed"}
        >
          {status === "open" ? "ซื้อหวย" : "ปิดรับแทง"}
        </Button>

        {/* Bottom decorative pattern */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
          <div className="text-yellow-400/50 text-xs">✦</div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
        </div>
      </div>
    </Card>
  );
};

export default LotteryCard;
