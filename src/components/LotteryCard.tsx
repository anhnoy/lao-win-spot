import { Button } from "@/components/ui/button";

interface LotteryCardProps {
  title: string;
  type: string;
  closingTime: string;
  prize: string;
  status: "open" | "closed";
  onAddToCart?: () => void;
  onBuy?: () => void;
}

const LotteryCard = ({ title, type, closingTime, prize, status, onAddToCart, onBuy }: LotteryCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Background with overlay */}
      <div 
        className="relative p-6 pb-0"
        style={{ 
          backgroundImage: "url('https://i.imgur.com/X14lxZe.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-900/80 to-blue-900/80"></div>
        
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-yellow-400"></div>
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-yellow-400"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-yellow-400"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-yellow-400"></div>

        {/* Corner decorations */}
        <svg className="absolute top-2 left-2 w-16 h-16 text-yellow-500" viewBox="0 0 100 100" fill="currentColor">
          <path d="M0,0 L20,0 C10,10 10,10 0,20 Z" />
        </svg>
        <svg className="absolute top-2 right-2 w-16 h-16 text-yellow-500 rotate-90" viewBox="0 0 100 100" fill="currentColor">
          <path d="M0,0 L20,0 C10,10 10,10 0,20 Z" />
        </svg>
        <svg className="absolute bottom-2 left-2 w-16 h-16 text-yellow-500 -rotate-90" viewBox="0 0 100 100" fill="currentColor">
          <path d="M0,0 L20,0 C10,10 10,10 0,20 Z" />
        </svg>
        <svg className="absolute bottom-2 right-2 w-16 h-16 text-yellow-500 rotate-180" viewBox="0 0 100 100" fill="currentColor">
          <path d="M0,0 L20,0 C10,10 10,10 0,20 Z" />
        </svg>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Title */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-yellow-400 tracking-wider">{title}</h3>
            <p className="text-sm text-yellow-300 mt-1">{type}</p>
          </div>

          {/* Date and Round Info */}
          <div className="border-2 border-yellow-500/60 rounded p-3 text-center bg-black/20">
            <p className="text-yellow-300 text-sm">
              งวด / วันที่ออกหวย: <span className="font-bold">{closingTime}</span>
            </p>
          </div>

          {/* Lottery Number */}
          <div className="text-center py-4">
            <div className="text-6xl font-bold text-yellow-400 tracking-wider drop-shadow-lg">
              789456
            </div>
          </div>

          {/* QR Code and Price Section */}
          <div className="flex items-center justify-between px-4">
            <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
              <div className="text-xs text-center text-black">QR</div>
            </div>
            
            <div className="flex-1 mx-4">
              <div className="border border-yellow-500/40 rounded px-4 py-2 text-center bg-black/20">
                <p className="text-yellow-300 text-sm">ราคาสลาก: <span className="font-bold text-lg">{prize}</span></p>
              </div>
            </div>
          </div>

          {/* Decorative element (Barcode area) */}
          <div className="h-8 bg-white/10 rounded mx-4"></div>
        </div>
      </div>

      {/* Prize and Button Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 space-y-3">
        <div className="text-center">
          <p className="text-yellow-400 text-sm mb-1">🏆 รางวัลสูงสุด: <span className="text-xl font-bold">{prize}</span></p>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-lg py-6 rounded-lg shadow-lg transition-all"
            disabled={status === "closed"}
            onClick={onAddToCart}
          >
            เพิ่มลงตะกร้า
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg py-6 rounded-lg shadow-lg transition-all"
            disabled={status === "closed"}
            onClick={onBuy}
          >
            {status === "open" ? "ซื้อหวย" : "ปิดรับแทง"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LotteryCard;
