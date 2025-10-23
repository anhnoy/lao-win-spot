import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import LotteryCard from "@/components/LotteryCard";
import { Sparkles, Shield, Zap, Award } from "lucide-react";
import heroImage from "@/assets/hero-lottery.jpg";
import { useCartContext } from "@/contexts/CartContext";
import { toast } from "sonner";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCartContext();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddToCart = (number: string) => {
    addToCart(number, 1);
  };

  const handleBuy = () => {
    toast.info("กรุณาเลือกเลขที่ต้องการซื้อจากหน้าซื้อหวย");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                ระบบซื้อหวยออนไลน์ที่ทันสมัยที่สุด
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-thai leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                หวยลาวออนไลน์
              </span>
              <br />
              <span className="text-foreground">ซื้อง่าย จ่ายจริง</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-thai max-w-2xl mx-auto">
              แพลตฟอร์มซื้อหวยลาวที่ปลอดภัย รองรับหวยทุกประเภท
              พร้อมระบบตรวจผลอัตโนมัติ
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-lg px-8"
                asChild
              >
                <Link to="/buy">
                  <Zap className="mr-2 h-5 w-5" />
                  เริ่มซื้อหวย
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                asChild
              >
                <Link to="/results">ดูผลหวย</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3 p-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold">
                <Zap className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold font-thai">จ่ายเร็ว</h3>
              <p className="text-muted-foreground">
                ถูกรางวัลโอนเข้าบัญชีทันที ไม่มีค่าธรรมเนียม
              </p>
            </div>

            {/* Award Icon - กดแล้วโชว์ Modal */}
            <div
              className="text-center space-y-3 p-6 cursor-pointer"
              onClick={openModal}
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-win">
                <Award className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-bold font-thai">อัตราจ่ายสูง</h3>
              <p className="text-muted-foreground">
                อัตราการจ่ายรางวัลสูงที่สุด คุ้มค่าทุกการเสี่ยงโชค
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lottery Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-thai mb-4">
              หวยลาวทประเภทใบ
            </h2>
            <p className="text-muted-foreground text-lg">
              เลือกซื้อหวยลาวที่คุณชื่นชอบ ได้ลุ้นรางวัลใหญ่ 140 รางวัลต{" "}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <LotteryCard
              title="หวยลาวพัฒนา"
              type="พัฒนา"
              closingTime="15:30 น."
              prize="x900"
              status="open"
              onAddToCart={() => handleAddToCart("789456")}
              onBuy={handleBuy}
            />
            <LotteryCard
              title="หวยลาว VIP"
              type="VIP"
              closingTime="16:00 น."
              prize="x950"
              status="open"
              onAddToCart={() => handleAddToCart("123456")}
              onBuy={handleBuy}
            />
            <LotteryCard
              title="หวยลาวสตาร์"
              type="สตาร์"
              closingTime="17:30 น."
              prize="x1000"
              status="open"
              onAddToCart={() => handleAddToCart("456789")}
              onBuy={handleBuy}
            />
            <LotteryCard
              title="หวยลาวทีวี"
              type="ทีวี"
              closingTime="18:00 น."
              prize="x800"
              status="open"
              onAddToCart={() => handleAddToCart("987654")}
              onBuy={handleBuy}
            />
            <LotteryCard
              title="หวยลาวพัฒนา"
              type="พัฒนา"
              closingTime="20:30 น."
              prize="x900"
              status="open"
              onAddToCart={() => handleAddToCart("135790")}
              onBuy={handleBuy}
            />
            <LotteryCard
              title="หวยลาว VIP"
              type="VIP"
              closingTime="21:00 น."
              prize="x950"
              status="open"
              onAddToCart={() => handleAddToCart("246813")}
              onBuy={handleBuy}
            />
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/buy">ดูหวยทั้งหมด</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Modal แสดงอัตราจ่าย */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              อัตราจ่ายหวยลาว
            </h2>

            <table className="w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">ประเภทหวย</th>
                  <th className="border px-2 py-1">อัตราจ่าย (บาท/1 หน่วย)</th>
                  <th className="border px-2 py-1">การจ่ายข้างเคียง</th>
                  <th className="border px-2 py-1">ตัวอย่าง</th>
                  <th className="border px-2 py-1">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">1 ตัวตรง</td>
                  <td className="border px-2 py-1">4</td>
                  <td className="border px-2 py-1">–</td>
                  <td className="border px-2 py-1">
                    แทงเลข 7 → ออก 7 → ได้ 4 บาท
                  </td>
                  <td className="border px-2 py-1">แทงเลขตรง 1 ตัว</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">2 ตัวตรง</td>
                  <td className="border px-2 py-1">95</td>
                  <td className="border px-2 py-1">ข้างเคียง: 4</td>
                  <td className="border px-2 py-1">
                    แทงเลข 23 → ออก 23 → ได้ 95 บาท
                    <br />
                    ออก 22 หรือ 24 → ได้ 4 บาท
                  </td>
                  <td className="border px-2 py-1">
                    ตัวตรง + ข้างเคียงเลขใกล้เคียง
                  </td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">3 ตัวตรง</td>
                  <td className="border px-2 py-1">800</td>
                  <td className="border px-2 py-1">ข้างเคียง: 130</td>
                  <td className="border px-2 py-1">
                    แทงเลข 123 → ออก 123 → ได้ 800 บาท
                    <br />
                    ออก 122 หรือ 124 → ได้ 130 บาท
                  </td>
                  <td className="border px-2 py-1">
                    ตัวตรง + ข้างเคียงเลขใกล้เคียง
                  </td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">4 ตัวตรง</td>
                  <td className="border px-2 py-1">4,500</td>
                  <td className="border px-2 py-1">–</td>
                  <td className="border px-2 py-1">
                    แทงเลข 1234 → ออก 1234 → ได้ 4,500 บาท
                  </td>
                  <td className="border px-2 py-1">ตัวตรง 4 ตัว</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">5 ตัวตรง</td>
                  <td className="border px-2 py-1">55,000</td>
                  <td className="border px-2 py-1">–</td>
                  <td className="border px-2 py-1">
                    แทงเลข 12345 → ออก 12345 → ได้ 55,000 บาท
                  </td>
                  <td className="border px-2 py-1">ตัวตรง 5 ตัว</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">6 ตัวตรง</td>
                  <td className="border px-2 py-1">130,000</td>
                  <td className="border px-2 py-1">–</td>
                  <td className="border px-2 py-1">
                    แทงเลข 123456 → ออก 123456 → ได้ 130,000 บาท
                  </td>
                  <td className="border px-2 py-1">ตัวตรง 6 ตัว</td>
                </tr>
              </tbody>
            </table>

            <p className="mt-3 text-sm text-gray-600">
              💡 หมายเหตุ:
              <br />
              ข้างเคียง = เลขใกล้เคียงตัวตรง 1 หลัก เช่น
              <br />
              2 ตัวตรง: แทง 23 → ข้างเคียงคือ 22, 24
              <br />
              3 ตัวตรง: แทง 123 → ข้างเคียงคือ 122, 124
              <br />
              ไม่มีการแยกตัวบน/ล่าง → ทุกเลขที่ออกถือว่าตรงตัว
            </p>

            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={closeModal}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-royal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground font-thai">
              พร้อมเสี่ยงโชคแล้วหรือยัง?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              สมัครสมาชิกวันนี้ รับโบนัสทันที 100 บาท
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
                asChild
              >
                <Link to="/register">สมัครสมาชิก</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/login">เข้าสู่ระบบ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © 2025 หวยลาวออนไลน์ - ระบบซื้อหวยออนไลน์ที่ปลอดภัยและน่าเชื่อถือ
            </p>
            <p className="mt-2">
              การพนันอาจเสพติดและเป็นอันตราย โปรดเล่นอย่างมีสติ
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
