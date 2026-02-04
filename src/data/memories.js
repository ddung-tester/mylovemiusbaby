// Danh sách ảnh kỷ niệm
// Thay thế các ảnh placeholder bằng ảnh thật của bạn trong thư mục src/assets/memories/

export const memories = [
    {
        id: 1,
        src: '/memories/1.jpg',
        title: 'Lần đầu tiên đi biển cùng nhau',
        caption: 'một khoảnh khắc tuyệt vời...',
        date: '2024-01-15'
    },
    {
        id: 2,
        src: '/memories/2.jpg',
        title: 'Cùng ngắm Hạ Long',
        caption: 'Nơi chúng ta có rất nhiều kỷ niệm đẹp, không khí trong lành...',
        date: '2024-02-20'
    },
    {
        id: 3,
        src: '/memories/3.jpg',
        title: 'Nơi chúng ta ngắm biển mỗi ngày',
        caption: 'Ngắm hoàng hôn bên nhau, khoảnh khắc lãng mạn nhất...',
        date: '2024-03-10'
    },
    {
        id: 4,
        src: '/memories/4.jpg',
        title: 'Ra biển cùng nhau',
        caption: 'Nụ cười tươi nhất của em, luôn làm anh hạnh phúc...',
        date: '2024-03-25'
    },
    {
        id: 5,
        src: '/memories/5.jpg',
        title: 'Đi tắm biển về',
        caption: 'Những bước chân bên nhau trên phố cũ...',
        date: '2024-04-05'
    },
    {
        id: 6,
        src: '/memories/6.jpg',
        title: 'Cùng nhau lên đồ đi chơi',
        caption: 'Thám hiểm mọi ngóc ngách của thành phố',
        date: '2024-04-18'
    },
    {
        id: 7,
        src: '/memories/7.jpg',
        title: 'Chuyến picnic',
        caption: 'Đi biển xong rồi, vào rừng thôi...',
        date: '2024-05-12'
    },
    {
        id: 8,
        src: '/memories/8.jpg',
        title: 'Đi rừng xong rồi, lên núi thôi...',
        caption: 'Những con đèo quen thuộc',
        date: '2024-06-03'
    },
    {
        id: 9,
        src: '/memories/9.jpg',
        title: 'Điều bí ẩn nhất là...',
        caption: 'Chú chó cuối cùng đó đã đi đâu...',
        date: '2024-06-20'
    },
    {
        id: 10,
        src: '/memories/10.jpg',
        title: 'Khoảng thời gian cách xa khói bụi',
        caption: 'save time...',
        date: '2024-07-08'
    },
    {
        id: 11,
        src: '/memories/11.jpg',
        title: 'Đi photobooth nào...',
        caption: 'Thời đi học chưa gặp nhau, nhưng cũng có ảnh tốt nghiệp với nhau',
        date: '2024-07-22'
    },
    {
        id: 12,
        src: '/memories/12.jpg',
        title: 'Còn ti',
        caption: 'Những khoảnh khắc giản đơn nhưng đầy hạnh phúc...',
        date: '2024-08-15'
    }
];

// Thứ tự hiển thị ảnh trong Gallery (thay đổi số để đổi thứ tự)
// Ví dụ: [5, 1, 3, 2, ...] nghĩa là ảnh id=5 hiển thị đầu tiên, sau đó là id=1, id=3, id=2...
export const galleryOrder = [1, 7, 11, 4, 9, 6, 2, 8, 5, 10, 12, 3];

// Các câu chuyện xen kẽ trong gallery
export const stories = [
    {
        id: 'story1',
        position: 4, // Hiển thị sau ảnh thứ 4
        title: 'Hành trình của chúng ta',
        content: 'Từ những ngày đầu gặp gỡ đến giờ, mỗi khoảnh khắc bên em đều là một kỷ niệm đáng nhớ. Anh biết rằng, có em bên cạnh là điều may mắn nhất trong cuộc đời anh.'
    },
    {
        id: 'story2',
        position: 8, // Hiển thị sau ảnh thứ 8
        title: 'Điều anh muốn nói',
        content: 'Em có biết không? Mỗi ngày thức dậy và nghĩ đến em, anh lại thấy cuộc sống này thật ý nghĩa. Em là ánh sáng dẫn đường cho anh.'
    },
    {
        id: 'story3',
        position: 12, // Hiển thị sau ảnh cuối
        title: 'Tương lai bên nhau',
        content: 'Anh mong rằng, chúng ta sẽ còn có thêm rất nhiều kỷ niệm đẹp như thế này. Và dù thời gian có trôi, tình cảm của anh dành cho em sẽ mãi không thay đổi. Yêu em! 💖'
    }
];
