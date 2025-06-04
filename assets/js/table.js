        // Table data
const tablesData = [
            {
                id: 1,
                name: "Bàn VIP ",
                status: "available",
                capacity: "2-4 người",
                location: "Tầng 1 - Khu vực riêng tư",
                price: "500.000 VNĐ",
                description: "Bàn VIP với view đẹp, không gian riêng tư, phù hợp cho các buổi hẹn hò lãng mạn.",
                features: ["View sông", "Không gian riêng tư", "Âm nhạc nhẹ nhàng", "Trang trí hoa tươi"],
                mainImage: "./assets/images/banvip.jpg",
                gallery: [
                    "./assets/images/banvip1.jpg",
                    "./assets/images/banvip2.jpg",
                    "./assets/images/banvip3.jpg",
                ]
            },
            {
                id: 2,
                name: "Bàn Gia Đình ",
                status: "occupied",
                capacity: "6-8 người",
                location: "Tầng 1 - Khu vực chính",
                price: "800.000 VNĐ",
                description: "Bàn rộng rãi dành cho gia đình, nhóm bạn với không gian thoải mái.",
                features: ["Bàn tròn lớn", "Ghế êm ái", "Gần khu vui chơi trẻ em", "Menu trẻ em"],
                mainImage: "/assets/images/bangiadinh.jpg",
                gallery: [
                    "/assets/images/bangiadinh.jpg" ,
                    "/assets/images/bangiadinh.jpg" 
                ]
            },
            {
                id: 3,
                name: "Bàn Sân Vườn ",
                status: "reserved",
                capacity: "4-6 người",
                location: "Sân vườn - Ngoài trời",
                price: "600.000 VNĐ",
                description: "Bàn ngoài trời trong khu vườn xanh mát, không khí trong lành.",
                features: ["Không gian mở", "Cây xanh", "Ánh sáng tự nhiên", "Phù hợp chụp ảnh"],
                mainImage: "/assets/images/bansanvuon.jpg",
                gallery: [
                    "/assets/images/bansanvuon1.jpg" ,
                    "/assets/images/bansanvuon2.jpg" ,
                    "/assets/images/bansanvuon3.jpg" 
                ]
            },
            {
                id: 4,
                name: "Bàn Sân Vườn 2",
                status: "available",
                capacity: "4-6 người",
                location: "Sân vườn - Ngoài trời",
                price: "600.000 VNĐ",
                description: "Bàn ngoài trời trong khu vườn xanh mát, không khí trong lành.",
                features: ["Không gian mở", "Cây xanh", "Ánh sáng tự nhiên", "Phù hợp chụp ảnh"],
                mainImage: "/assets/images/ChatGPT Image 00_16_12 27 thg 4, 2025.png",
                gallery: [
                    "/assets/images/ChatGPT Image 00_14_26 27 thg 4, 2025.png" ,
                    "/assets/images/3.jpg" ,
                    "/assets/images/bansanvuon3.jpg" 
                ]
            },
        ];

        // Generate tables
        function generateTables() {
            const tablesGrid = document.getElementById('tablesGrid');
            tablesGrid.innerHTML = '';

            tablesData.forEach(table => {
                const statusClass = `status-${table.status}`;
                const statusText = {
                    'available': 'Còn trống',
                    'occupied': 'Đang sử dụng',
                    'reserved': 'Đã đặt'
                };

                const isDisabled = table.status !== 'available';

                const tableCard = document.createElement('div');
                tableCard.className = 'table-card';
                tableCard.innerHTML = `
                    <div class="table-image" style="background-image: url('${table.mainImage}')">
                        <div class="table-status ${statusClass}">${statusText[table.status]}</div>
                    </div>
                    <div class="table-info">
                        <h3 class="table-name">${table.name}</h3>
                        <div class="table-details">
                            <p><strong>Sức chứa:</strong> ${table.capacity}</p>
                            <p><strong>Vị trí:</strong> ${table.location}</p>
                        </div>
                        <div class="table-price">${table.price}</div>
                        <button class="book-button" ${isDisabled ? 'disabled' : ''} onclick="openModal(${table.id})">
                            ${isDisabled ? 'Không khả dụng' : 'Xem chi tiết & Đặt bàn'}
                        </button>
                    </div>
                `;

                tablesGrid.appendChild(tableCard);
            });
        }

        // Modal functionality
        const modal = document.getElementById('tableModal');
        const closeBtn = document.querySelector('.close');

        function openModal(tableId) {
            const table = tablesData.find(t => t.id === tableId);
            if (!table || table.status !== 'available') return;

            // Update modal content
            document.getElementById('modalTableName').textContent = table.name;
            
            // Update image gallery
            const imageGallery = document.getElementById('imageGallery');
            imageGallery.innerHTML = '';
            table.gallery.forEach(image => {
                const img = document.createElement('div');
                img.className = 'gallery-image';
                img.style.backgroundImage = `url('${image}')`;
                imageGallery.appendChild(img);
            });

            // Update table details
            const tableDetails = document.getElementById('tableFullDetails');
            tableDetails.innerHTML = `
                <h4 style="color: #d4af37; margin-bottom: 1rem;">Thông tin chi tiết</h4>
                <p><strong>Sức chứa:</strong> ${table.capacity}</p>
                <p><strong>Vị trí:</strong> ${table.location}</p>
                <p><strong>Giá:</strong> ${table.price}</p>
                <p><strong>Mô tả:</strong> ${table.description}</p>
                <h5 style="color: #d4af37; margin: 1rem 0 0.5rem 0;">Tiện ích:</h5>
                <ul style="margin-left: 1rem;">
                    ${table.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            `;

            // Set current table ID for booking
            document.getElementById('bookingForm').dataset.tableId = tableId;

            // Set minimum date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('bookingDate').min = today;

            modal.style.display = 'block';
        }

        function closeModal() {
            modal.style.display = 'none';
            document.getElementById('bookingForm').reset();
        }

        closeBtn.onclick = closeModal;

        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        }

        // Booking form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const tableId = this.dataset.tableId;
            const table = tablesData.find(t => t.id == tableId);

            const bookingData = {
                tableId: tableId,
                tableName: table.name,
                tableImage: table.mainImage,
                customerName: document.getElementById('customerName').value,
                bookingDate: document.getElementById('bookingDate').value,
                bookingTime: document.getElementById('bookingTime').value,
                guestCount: document.getElementById('guestCount').value,
                specialRequests: document.getElementById('specialRequests').value,
                status: "reserved"
            };

            // Kiểm tra nếu `localStorage` có dữ liệu, nếu không thì khởi tạo là mảng rỗng
            let bookings = JSON.parse(localStorage.getItem('bookingInfo')) || [];

            // Đảm bảo `bookings` là mảng trước khi push
            if (!Array.isArray(bookings)) {
                bookings = []; // Nếu không phải mảng, khởi tạo lại
            }

            // Thêm bàn mới vào danh sách
            bookings.push(bookingData);

            // Lưu lại danh sách vào `localStorage`
            localStorage.setItem('bookingInfo', JSON.stringify(bookings));
            alert("Bàn đã được đặt thành công!");
              // Cập nhật trạng thái bàn UI ngay lập tức
            table.status = "reserved"; 
             generateTables(); // Cập nhật lại danh sách bàn
            closeModal();
});


        

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Initialize
        generateTables();

        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            // Parallax effect for hero section
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        });