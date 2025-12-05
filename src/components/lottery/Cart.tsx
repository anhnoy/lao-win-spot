import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2 } from "lucide-react";
import { CartItem } from "@/types/lottery";

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  totalPrice: number;
  onCheckout: () => void;
}

const Cart = ({ items, onRemove, totalPrice, onCheckout }: CartProps) => {
  return (
    <Card className="p-6 sticky top-20">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold font-thai">ตะกร้า</h2>
        <Badge variant="secondary">{items.length}</Badge>
      </div>

      <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>ตะกร้าว่างเปล่า</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-bold text-lg">เลข {item.number}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold">{item.price} ฿</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <>
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>ยอดรวม</span>
              <span className="text-2xl bg-gradient-gold bg-clip-text text-transparent">
                {totalPrice.toLocaleString()} ฿
              </span>
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-gold hover:opacity-90" 
            size="lg"
            onClick={onCheckout}
          >
            ยืนยันการซื้อ
          </Button>
        </>
      )}
    </Card>
  );
};

export default Cart;
