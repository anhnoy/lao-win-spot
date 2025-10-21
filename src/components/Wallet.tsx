import { useState } from "react";
import { Button } from "@/components/ui/button";

const Wallet = () => {
  // ตัวอย่าง state สำหรับยอดเงิน
  const [balance, setBalance] = useState(1500000);
  const [referral, setReferral] = useState(50000);

  // ตัวอย่างประวัติธุรกรรม
  const transactions = [
    { date: "21/10/2025", type: "ฝากเงิน", amount: 500, status: "สำเร็จ" },
    { date: "20/10/2025", type: "ถอนเงิน", amount: 300, status: "รอดำเนินการ" },
    { date: "19/10/2025", type: "แนะนำเพื่อน", amount: 100, status: "สำเร็จ" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold font-thai mb-2">ยอดเงินรวม</h3>
          <p className="text-2xl font-extrabold">{balance.toLocaleString()} ฿</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold font-thai mb-2">เงินจากแนะนำเพื่อน</h3>
          <p className="text-2xl font-extrabold text-green-600">{referral.toLocaleString()} ฿</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">ฝากเงิน</Button>
        <Button className="bg-red-500 hover:bg-red-600 text-white">ถอนเงิน</Button>
        <Button className="bg-gray-200 hover:bg-gray-300 text-gray-700">ประวัติธุรกรรม</Button>
      </div>

      {/* Recent Transactions */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">วันที่</th>
              <th className="px-4 py-2 text-left">ประเภท</th>
              <th className="px-4 py-2 text-right">จำนวนเงิน</th>
              <th className="px-4 py-2 text-left">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{tx.date}</td>
                <td className="px-4 py-2">{tx.type}</td>
                <td className="px-4 py-2 text-right">{tx.amount.toLocaleString()} ฿</td>
                <td className="px-4 py-2">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wallet;
