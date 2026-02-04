# 💖 Cinematic Love Website Project

Chào mừng đến với project website tình yêu phiên bản Cinematic Premium! Đây là phiên bản nâng cấp với giao diện sang trọng, hiệu ứng 3D mượt mà và trải nghiệm người dùng tuyệt vời.

## 🌟 Tính năng mới (v2.0 Cinematic)

- **Giao diện Premium**: Sử dụng Design System cao cấp với màu sắc gradient (romantic/mauve), glassmorphism, và typography điện ảnh.
- **3D Effects**: Hiệu ứng "Flower Burst" được nâng cấp bằng Three.js với particles xoắn ốc và ánh sáng magical.
- **Tabs Experience**: Gallery hỗ trợ nhiều chế độ xem: Grid và Timeline.
- **Interactive UI**: Các thành phần tương tác mượt mà (hover, dialog, scroll animations) sử dụng Framer Motion và Radix UI.
- **Responsive**: Tối ưu hoàn toàn cho cả Mobile và Desktop.

---

## 🛠️ Hướng dẫn cài đặt thủ công (Quan trọng)

Do bạn gặp vấn đề với việc tự động chạy lệnh cài đặt, hãy làm theo các bước sau để cài môi trường thủ công:

### Bước 1: Cài đặt Dependencies cơ bản (Vite + React)
Nếu bạn chưa chạy lệnh này bao giờ:
```bash
npm install
```

### Bước 2: Cài đặt các thư viện UI & Animation mới
Copy và chạy dòng lệnh sau để cài tất cả các thư viện cần thiết cho giao diện mới:

```bash
npm install clsx tailwind-merge class-variance-authority @radix-ui/react-dialog @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-toast framer-motion lucide-react @react-three/fiber @react-three/drei three tailwindcss-animate
```

### Bước 3: Thêm ảnh
Tạo thư mục `public/memories` và thêm 12 ảnh của bạn vào đó, đặt tên từ `01.jpg` đến `12.jpg`.

### Bước 4: Chạy dự án
```bash
npm run dev
```

Truy cập: `http://localhost:5173`

---

## 📂 Customization (Tùy chỉnh)

### 1. Thay đổi nội dung Text
- **Gate Screen**: Mở `src/pages/Gate.jsx` để đổi câu hỏi, đáp án (biến `correctAnswer`) và các gợi ý.
- **Memories Screen**: Mở `src/pages/Memories.jsx` để đổi tiêu đề, quote mở đầu.

### 2. Thay đổi dữ liệu ảnh & câu chuyện
Mở `src/data/memories.js`. Đây là nơi bạn sửa danh sách ảnh, caption và ngày tháng.

### 3. Thay đổi màu sắc chủ đạo
Mở `tailwind.config.js`. Bạn có thể chỉnh sửa dải màu `rose`, `mauve`, `champagne` theo ý thích.

---

## 🐛 Troubleshooting

**Lỗi 1: Không thấy ảnh**
-> Kiểm tra xem bạn đã tạo thư mục `public/memories` và bỏ ảnh vào chưa. Tên ảnh phải khớp chính xác (`01.jpg`, `02.jpg`...).

**Lỗi 2: Class not found / Style bị vỡ**
-> Đảm bảo bạn đã chạy `npm install` ở Bước 2 để cài `clsx`, `tailwind-merge` và `tailwindcss-animate`.

**Lỗi 3: Lỗi import**
-> Nếu gặp lỗi liên quan đến `@/lib/utils`, hãy đảm bảo file `vite.config.js` có cấu hình alias `@` trỏ đến `./src`. (Project hiện tại đã có sẵn).

Chúc bạn có một website thật lãng mạn và ý nghĩa! 💖
"# mylovemiusbaby" 
