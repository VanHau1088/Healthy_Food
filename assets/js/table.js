        // Table data
        const tablesData = [
            {
                id: 1,
                name: "Bàn VIP 1",
                status: "available",
                capacity: "2-4 người",
                location: "Tầng 1 - Khu vực riêng tư",
                price: "500.000 VNĐ",
                description: "Bàn VIP với view đẹp, không gian riêng tư, phù hợp cho các buổi hẹn hò lãng mạn.",
                features: ["View sông", "Không gian riêng tư", "Âm nhạc nhẹ nhàng", "Trang trí hoa tươi"],
                mainImage: "./assets/images/3. Bánh Cuốn Hạt Gai Dầu (Hemp Seed) với Nhân Rau Củ Fermented.jpg",
                gallery: [
                    "./assets/images/about-image.jpg",
                    "./assets/images/BÁNH QUY ĂN THEO PT.jpg",
                    "./assets/images/CHẢ LÁ LỐT.jpg",
                    "./assets/images/BÁNH QUY ĂN THEO PT.jpg",
                ]
            },
            {
                id: 2,
                name: "Bàn Gia Đình 1",
                status: "occupied",
                capacity: "6-8 người",
                location: "Tầng 1 - Khu vực chính",
                price: "800.000 VNĐ",
                description: "Bàn rộng rãi dành cho gia đình, nhóm bạn với không gian thoải mái.",
                features: ["Bàn tròn lớn", "Ghế êm ái", "Gần khu vui chơi trẻ em", "Menu trẻ em"],
                mainImage: "/placeholder.svg?height=200&width=300",
                gallery: [
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200"
                ]
            },
            {
                id: 3,
                name: "Bàn Sân Vườn 1",
                status: "available",
                capacity: "4-6 người",
                location: "Sân vườn - Ngoài trời",
                price: "600.000 VNĐ",
                description: "Bàn ngoài trời trong khu vườn xanh mát, không khí trong lành.",
                features: ["Không gian mở", "Cây xanh", "Ánh sáng tự nhiên", "Phù hợp chụp ảnh"],
                mainImage: "/placeholder.svg?height=200&width=300",
                gallery: [
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200"
                ]
            },
            {
                id: 4,
                name: "Bàn VIP 2",
                status: "reserved",
                capacity: "2-4 người",
                location: "Tầng 2 - Phòng riêng",
                price: "700.000 VNĐ",
                description: "Phòng riêng cao cấp với dịch vụ butler, phù hợp cho các dịp đặc biệt.",
                features: ["Phòng riêng", "Dịch vụ butler", "Karaoke", "Minibar"],
                mainImage: "/placeholder.svg?height=200&width=300",
                gallery: [
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200"
                ]
            },
            {
                id: 5,
                name: "Bàn Thường 1",
                status: "available",
                capacity: "2-4 người",
                location: "Tầng 1 - Khu vực chính",
                price: "300.000 VNĐ",
                description: "Bàn tiêu chuẩn với chất lượng dịch vụ tốt, giá cả hợp lý.",
                features: ["Vị trí trung tâm", "Dễ di chuyển", "Phù hợp mọi lứa tuổi", "Menu đa dạng"],
                mainImage: "/placeholder.svg?height=200&width=300",
                gallery: [
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200"
                ]
            },
            {
                id: 6,
                name: "Bàn Bar",
                status: "available",
                capacity: "2-3 người",
                location: "Khu vực Bar - Tầng 1",
                price: "400.000 VNĐ",
                description: "Bàn cao tại quầy bar, phù hợp cho những ai thích không gian sôi động.",
                features: ["Quầy bar", "Cocktail đặc biệt", "Nhạc sống", "View pha chế"],
                mainImage: "/placeholder.svg?height=200&width=300",
                gallery: [
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200"
                ]
            },
            {
                id: 7,
                name: "Bàn Sân Thượng",
                status: "available",
                capacity: "4-6 người",
                location: "Sân thượng - Tầng 3",
                price: "900.000 VNĐ",
                description: "Bàn trên sân thượng với view toàn cảnh thành phố, lý tưởng cho buổi tối.",
                features: ["View thành phố", "Không gian mở", "Ánh sáng đèn trang trí", "Gió mát"],
                mainImage: "/placeholder.svg?height=200&width=300",
                gallery: [
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200"
                ]
            },
            {
                id: 8,
                name: "Bàn Gia Đình 2",
                status: "available",
                capacity: "8-10 người",
                location: "Tầng 2 - Phòng lớn",
                price: "1.200.000 VNĐ",
                description: "Phòng lớn dành cho các buổi tiệc gia đình, sinh nhật, kỷ niệm.",
                features: ["Phòng riêng lớn", "Trang trí theo yêu cầu", "Âm thanh chuyên nghiệp", "Menu tiệc"],
                mainImage: "/placeholder.svg?height=200&width=300",
                gallery: [
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200",
                    "/placeholder.svg?height=150&width=200"
                ]
            }
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
            const formData = new FormData(this);
            
            const bookingData = {
                tableId: tableId,
                tableName: tablesData.find(t => t.id == tableId).name,
                customerName: document.getElementById('customerName').value,
                customerPhone: document.getElementById('customerPhone').value,
                bookingDate: document.getElementById('bookingDate').value,
                bookingTime: document.getElementById('bookingTime').value,
                guestCount: document.getElementById('guestCount').value,
                specialRequests: document.getElementById('specialRequests').value
            };

            // Simulate booking process
            alert(`Đặt bàn thành công!\n\nThông tin đặt bàn:\n- Bàn: ${bookingData.tableName}\n- Khách hàng: ${bookingData.customerName}\n- Ngày: ${bookingData.bookingDate}\n- Giờ: ${bookingData.bookingTime}\n- Số khách: ${bookingData.guestCount}\n\nChúng tôi sẽ liên hệ với bạn để xác nhận trong vòng 15 phút.`);
            
            // Update table status to reserved
            const table = tablesData.find(t => t.id == tableId);
            table.status = 'reserved';
            
            // Regenerate tables and close modal
            generateTables();
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