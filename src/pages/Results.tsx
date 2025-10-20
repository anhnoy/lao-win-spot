import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, TrendingUp } from "lucide-react";

const Results = () => {
  const results = [
    {
      id: "1",
      name: "หวยลาวพัฒนา",
      date: "25 ธ.ค. 2567",
      time: "16:30 น.",
      numbers: [
        { position: "รางวัลที่ 1", number: "47", prize: "3,500,000" },
        { position: "รางวัลที่ 2", number: "23", prize: "1,000,000" },
        { position: "รางวัลที่ 3", number: "89", prize: "500,000" },
      ],
    },
    {
      id: "2",
      name: "หวยลาว VIP",
      date: "25 ธ.ค. 2567",
      time: "17:00 น.",
      numbers: [
        { position: "รางวัลที่ 1", number: "12", prize: "5,000,000" },
        { position: "รางวัลที่ 2", number: "67", prize: "1,500,000" },
        { position: "รางวัลที่ 3", number: "34", prize: "750,000" },
      ],
    },
    {
      id: "3",
      name: "หวยลาวสตาร์",
      date: "24 ธ.ค. 2567",
      time: "15:00 น.",
      numbers: [
        { position: "รางวัลที่ 1", number: "56", prize: "4,200,000" },
        { position: "รางวัลที่ 2", number: "78", prize: "1,200,000" },
        { position: "รางวัลที่ 3", number: "90", prize: "600,000" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-thai mb-2">ผลหวยลาว</h1>
          <p className="text-muted-foreground">ตรวจผลรางวัลหวยลาวล่าสุด</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">รางวัลวันนี้</p>
                <p className="text-2xl font-bold">3 งวด</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-gold flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ยอดจ่ายรวม</p>
                <p className="text-2xl font-bold">12.8M ฿</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-win flex items-center justify-center">
                <Calendar className="h-6 w-6 text-success-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">งวดถัดไป</p>
                <p className="text-2xl font-bold">26 ธ.ค.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {results.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <div className="bg-gradient-royal p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-primary-foreground font-thai">
                      {result.name}
                    </h2>
                    <p className="text-primary-foreground/80 mt-1">
                      งวดวันที่ {result.date} • เวลา {result.time}
                    </p>
                  </div>
                  <Badge className="bg-success w-fit">
                    ประกาศผลแล้ว
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {result.numbers.map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted border border-border hover:shadow-lg transition-shadow"
                    >
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        {item.position}
                      </p>
                      <div className="my-4 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary">
                        <span className="text-4xl font-bold text-primary-foreground">
                          {item.number}
                        </span>
                      </div>
                      <p className="text-lg font-bold bg-gradient-gold bg-clip-text text-transparent">
                        {item.prize} ฿
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    💡 <strong>เคล็ดลับ:</strong> บันทึกเลขที่ถูกรางวัลเพื่อวิเคราะห์แนวโน้ม
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* History Note */}
        <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
          <div className="text-center">
            <Trophy className="h-12 w-12 mx-auto mb-3 text-primary" />
            <h3 className="text-xl font-bold font-thai mb-2">ดูผลย้อนหลัง</h3>
            <p className="text-muted-foreground">
              สามารถดูประวัติผลรางวัลย้อนหลัง 90 วันได้ในหน้าโปรไฟล์ของคุณ
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Results;
