# 🎮 Candy Slot Match 4 - Prototype (PixiJS + Next.js)

Bài test thực hiện bởi **Phan Đức Lâm**  

## 📌 Giới thiệu
Đây là bản prototype đơn giản cho chức năng **spin và trả kết quả** của game **Candy Match 4** được xây dựng trên **PixiJS (v7)** kết hợp với **Next.js**.  
Prototype này tập trung vào việc thể hiện **board**, **reel**, **symbol**, cơ chế **spin – stop – check cluster thắng – rơi lấp chỗ trống**.

---

## 🕹️ Gameplay

- **Board**: ma trận 5 reel (cột), mỗi reel chứa nhiều symbol kẹo.  
- **Reel**: guồng quay theo chiều dọc.  
- **Symbol**: 1 viên kẹo. Có nhiều loại kẹo, kẹo ngũ sắc là wild (có thể thay thế cho bất kỳ loại nào) nhưng không tự tạo cụm thắng.

**Luật thắng:**
- Khi có từ **4 symbol cùng loại trở lên kề nhau** tạo thành 1 cụm → thưởng điểm.  
- Nếu có **nhiều cụm cùng lúc**, người chơi nhận thưởng từ tất cả.  
- Sau khi ăn cụm, symbol biến mất → tạo khoảng trống → symbol mới rơi xuống lấp chỗ trống. Nếu tiếp tục có cụm mới thì tiếp tục ăn.

---

## ⚙️ Chức năng chính

1. **Spin**  
   - Khi bấm `StartSpin`, các reel quay từ trái qua phải (delay giữa các reel = `0.3s`).  
   - Tối thiểu quay trong `2s`.  
   - Game gửi request đến server (giả lập qua `requestSpinData()`).  

2. **Stop & Hiển thị kết quả**  
   - Khi server trả về kết quả (hoặc sau 2s) → reel dừng lại theo thứ tự từ trái sang phải.  
   - Symbol hiển thị theo matrix data từ server.  

3. **Ăn cụm thắng (cluster)**  
   - Nếu xuất hiện cụm ≥ 4 symbol kề nhau → cụm thắng được highlight, biến mất.  
   - Symbol phía trên rơi xuống (có animation rơi tự do).  
   - Gửi request mới lấy thêm symbol để lấp đầy chỗ trống.  
   - Quá trình lặp lại cho đến khi không còn cụm thắng.

4. **Button StartSpin**  
   - Khi đang spin thì bị disable + mờ đi.  
   - Khi dừng xong toàn bộ → bật lại.  

---

## 🛠️ Công nghệ

- [PixiJS v7](https://pixijs.com/) – render game board, reel, symbol, animation.  
- [Next.js 15](https://nextjs.org/) – framework React để chạy FE.  
- TypeScript – viết code rõ ràng, dễ maintain.  
- Pattern hướng đối tượng: `Game -> Board -> Reel -> Symbol` giúp mở rộng dễ dàng.

---

## 🚀 Cài đặt & Chạy

```bash
# Cài dependencies
npm install

# Chạy development server
npm run dev

# Mở trình duyệt
http://localhost:3000
