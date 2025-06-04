 // DOM Elements
        const navItems = document.querySelectorAll('.nav-item');
        const contentSections = document.querySelectorAll('.content-section');
        const editProfileBtn = document.getElementById('editProfileBtn');
        const profileActions = document.getElementById('profileActions');
        const saveProfileBtn = document.getElementById('saveProfileBtn');
        const cancelProfileBtn = document.getElementById('cancelProfileBtn');
        const profileInputs = document.querySelectorAll('#profile input');
        const imageInput = document.getElementById('imageInput');
        const profileImage = document.getElementById('profileImage');
        const sidebarAvatar = document.getElementById('sidebarAvatar');
        const imageOverlay = document.getElementById('imageOverlay');
        const darkModeToggle = document.getElementById('darkModeToggle');
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        const cartBadge = document.getElementById('cartBadge');

        // State
        let isEditing = false;
        let originalProfileData = {};

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            initializeNavigation();
            initializeProfileEdit();
            initializeImageUpload();
            initializeCart();
            initializeDarkMode();
            initializeOrderFilters();
            
            // Load saved data
            loadSavedProfileData();
            loadSavedImage();
            
            // Store original profile data
            storeOriginalProfileData();
            
            // Update storage info
            updateStorageInfo();

        });

    // Load giỏ hàng từ localStorage
        // Load giỏ hàng từ localStorage
        document.addEventListener('DOMContentLoaded', function() {
            loadCartFromStorage();
        });

        document.addEventListener('DOMContentLoaded', function() {
            loadBookingInfo();
        });

        document.addEventListener("DOMContentLoaded", function () {
            loadOrderHistory();
        });



// Tải giỏ hàng từ localStorage và hiển thị
function loadCartFromStorage() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmountSpan = document.getElementById('totalAmount');

    let cart = localStorage.getItem('foodhubCart');
    if (!cart) {
        cartItemsContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống</p>";
        return;
    }
    
    cart = JSON.parse(cart);
    let total = 0;

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="50">
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
        </div>
    `).join('');

    total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalAmountSpan.textContent = `$${total.toFixed(2)}`;
}

// Thanh toán

function checkout() {
    let cart = JSON.parse(localStorage.getItem('foodhubCart')) || [];

    console.log("Dữ liệu giỏ hàng:", cart); // Kiểm tra trong Console

    if (cart.length === 0) {
        alert("Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.");
        return;
    }

    if (!confirm("Xác nhận thanh toán?")) return;

    let orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orders.push({
        orderId: Date.now(),
        items: cart,
        orderDate: new Date().toLocaleString(),
        status: "Đã đặt"
    });

    console.log("Dữ liệu đơn hàng trước khi lưu:", orders); // Kiểm tra trước khi lưu

    localStorage.setItem('orderHistory', JSON.stringify(orders));

    // Xóa giỏ hàng
    localStorage.removeItem('foodhubCart');
    loadCartFromStorage();

    alert("Đơn hàng đã được tạo thành công!");
}



// Đơn hàng 
function loadOrderHistory() {
    const orderContainer = document.getElementById('orderHistory');
    let orders = JSON.parse(localStorage.getItem('orderHistory')) || [];

    if (orders.length === 0) {
        orderContainer.innerHTML = "<p>Bạn chưa có đơn hàng nào.</p>";
        return;
    }

    orderContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <h3>🛍 Đơn hàng #${order.orderId}</h3>
            <ul>
                ${order.items.map(item => `
                    <li>
                        <img src="${item.image}" alt="${item.name}" width="60">
                        ${item.name} - $${item.price} x ${item.quantity}
                    </li>
                `).join('')}
            </ul>
            <p><strong>Ngày đặt:</strong> ${order.orderDate}</p>
            <p><strong>Trạng thái:</strong> ${order.status}</p>
        </div>
    `).join('');
}




// Đặt bàn
function loadBookingInfo() {
    const bookingContainer = document.getElementById('bookingInfo');
    let bookings = JSON.parse(localStorage.getItem('bookingInfo')) || [];

    if (bookings.length === 0) {
        bookingContainer.innerHTML = "<p>Chưa có bàn nào được đặt.</p>";
        return;
    }

    // Hiển thị danh sách các bàn đã đặt
    bookingContainer.innerHTML = bookings.map(booking => `
        <div class="booking-card">
            <img src="${booking.tableImage}" alt="${booking.tableName}">
            <div class="booking-details">
                <h3>${booking.tableName}</h3>
                <p><strong>Khách hàng:</strong> ${booking.customerName}</p>
                <p><strong>Ngày đặt:</strong> ${booking.bookingDate}</p>
                <p><strong>Giờ đặt:</strong> ${booking.bookingTime}</p>
                <p><strong>Số khách:</strong> ${booking.guestCount}</p>
                <p><strong>Yêu cầu:</strong> ${booking.specialRequests || "Không có"}</p>
                <button class="delete-booking-btn" onclick="deleteBooking('${booking.tableId}')">Xóa bàn</button>
            </div>
        </div>
    `).join('');
}


function deleteBooking(tableId) {
    if (confirm("Bạn có chắc muốn hủy đặt bàn?")) {
        let bookings = JSON.parse(localStorage.getItem('bookingInfo')) || [];
        // Xóa bàn có ID tương ứng
        bookings = bookings.filter(booking => booking.tableId !== tableId);
        // Cập nhật lại localStorage
        localStorage.setItem('bookingInfo', JSON.stringify(bookings));
        // Cập nhật giao diện
        loadBookingInfo();
        alert("Bàn đã được hủy!");
    }
}








        // Navigation
        function initializeNavigation() {
            navItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all nav items
                    navItems.forEach(nav => nav.classList.remove('active'));
                    
                    // Add active class to clicked item
                    this.classList.add('active');
                    
                    // Hide all content sections
                    contentSections.forEach(section => section.classList.remove('active'));
                    
                    // Show target section
                    const targetSection = this.getAttribute('data-section');
                    document.getElementById(targetSection).classList.add('active');
                });
            });
        }

        // Profile Edit Functions
        function initializeProfileEdit() {
            editProfileBtn.addEventListener('click', function() {
                if (!isEditing) {
                    enableProfileEdit();
                } else {
                    cancelProfileEdit();
                }
            });
            
            saveProfileBtn.addEventListener('click', function() {
                saveProfileChanges();
            });
            
            cancelProfileBtn.addEventListener('click', function() {
                cancelProfileEdit();
            });
        }

        function storeOriginalProfileData() {
            originalProfileData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                birthDate: document.getElementById('birthDate').value,
                address: document.getElementById('address').value
            };
        }

        function enableProfileEdit() {
            isEditing = true;
            
            // Enable inputs
            profileInputs.forEach(input => {
                input.removeAttribute('readonly');
                input.style.background = 'white';
                input.style.cursor = 'text';
            });
            
            // Show action buttons
            profileActions.style.display = 'flex';
            
            // Update edit button
            editProfileBtn.innerHTML = '<i class="fas fa-times"></i> Hủy chỉnh sửa';
            editProfileBtn.style.background = '#ef4444';
            
            showToast('Chế độ chỉnh sửa đã được bật');
        }

        function saveProfileChanges() {
            // Validate inputs
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (!fullName || !email || !phone) {
                showToast('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Email không hợp lệ', 'error');
                return;
            }

            // Save profile data to localStorage
            const profileData = {
                fullName: fullName,
                email: email,
                phone: phone,
                birthDate: document.getElementById('birthDate').value,
                address: document.getElementById('address').value,
                lastUpdated: new Date().toISOString()
            };

            localStorage.setItem('userProfileData', JSON.stringify(profileData));
            
            // Simulate API call
            setTimeout(() => {
                // Update sidebar info
                document.getElementById('sidebarName').textContent = fullName;
                document.getElementById('sidebarEmail').textContent = email;
                
                // Store new original data
                storeOriginalProfileData();
                
                // Disable editing
                disableProfileEdit();
                
                showToast('Thông tin đã được cập nhật và lưu thành công!');
            }, 1000);
        }

        function cancelProfileEdit() {
            // Restore original values
            document.getElementById('fullName').value = originalProfileData.fullName;
            document.getElementById('email').value = originalProfileData.email;
            document.getElementById('phone').value = originalProfileData.phone;
            document.getElementById('birthDate').value = originalProfileData.birthDate;
            document.getElementById('address').value = originalProfileData.address;
            
            disableProfileEdit();
            showToast('Đã hủy chỉnh sửa');
        }

        function disableProfileEdit() {
            isEditing = false;
            
            // Disable inputs
            profileInputs.forEach(input => {
                input.setAttribute('readonly', true);
                input.style.background = '#f8fafc';
                input.style.cursor = 'not-allowed';
            });
            
            // Hide action buttons
            profileActions.style.display = 'none';
            
            // Reset edit button
            editProfileBtn.innerHTML = '<i class="fas fa-edit"></i> Chỉnh sửa';
            editProfileBtn.style.background = '#6366f1';
        }

        // Load saved profile data
        function loadSavedProfileData() {
            try {
                const savedData = localStorage.getItem('userProfileData');
                if (savedData) {
                    const profileData = JSON.parse(savedData);

                    // Update form fields
                    document.getElementById('fullName').value = profileData.fullName || 'Nguyễn Thị Lan';
                    document.getElementById('email').value = profileData.email || 'lan.nguyen@email.com';
                    document.getElementById('phone').value = profileData.phone || '0123 456 789';
                    document.getElementById('birthDate').value = profileData.birthDate || '1990-05-15';
                    document.getElementById('address').value = profileData.address || '123 Đường ABC, Quận 1, TP.HCM';

                    // Update sidebar
                    document.getElementById('sidebarName').textContent = profileData.fullName || 'Nguyễn Thị Lan';
                    document.getElementById('sidebarEmail').textContent = profileData.email || 'lan.nguyen@email.com';

                    // Store as original data
                    storeOriginalProfileData();
                }
            } catch (error) {
                console.error('Không thể tải dữ liệu profile đã lưu:', error);
            }
        }

        // Image Upload Functions
        function initializeImageUpload() {
            imageOverlay.addEventListener('click', function() {
                imageInput.click();
            });
            
            imageInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    if (file.type.startsWith('image/')) {
                        // Validate file size (max 5MB)
                        if (file.size > 5 * 1024 * 1024) {
                            showToast('Kích thước ảnh không được vượt quá 5MB', 'error');
                            return;
                        }

                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const imageData = e.target.result;

                            // Update all image elements
                            updateAllImages(imageData);

                            // Save to localStorage
                            saveImageToStorage(imageData);

                            showToast('Ảnh đại diện đã được cập nhật và lưu!');
                            
                            // Update storage info
                            updateStorageInfo();
                        };
                        reader.readAsDataURL(file);
                    } else {
                        showToast('Vui lòng chọn file ảnh hợp lệ (JPG, PNG, GIF)', 'error');
                    }
                }
            });
        }

        // Update all image elements
        function updateAllImages(imageData) {
            profileImage.src = imageData;
            sidebarAvatar.src = imageData;

            // Add smooth transition effect
            profileImage.style.opacity = '0';
            sidebarAvatar.style.opacity = '0';

            setTimeout(() => {
                profileImage.style.opacity = '1';
                sidebarAvatar.style.opacity = '1';
            }, 200);
        }

        // Save image to localStorage
        function saveImageToStorage(imageData) {
            try {
                localStorage.setItem('userProfileImage', imageData);
                localStorage.setItem('imageLastUpdated', new Date().toISOString());
            } catch (error) {
                console.error('Không thể lưu ảnh:', error);
                showToast('Không thể lưu ảnh. Dung lượng lưu trữ có thể đã đầy.', 'error');
            }
        }

        // Load saved image from localStorage
        function loadSavedImage() {
            try {
                const savedImage = localStorage.getItem('userProfileImage');
                const lastUpdated = localStorage.getItem('imageLastUpdated');

                if (savedImage) {
                    updateAllImages(savedImage);

                    // Show when image was last updated
                    if (lastUpdated) {
                        const updateDate = new Date(lastUpdated);
                        console.log('Ảnh đại diện được cập nhật lần cuối:', updateDate.toLocaleString('vi-VN'));
                    }
                }
            } catch (error) {
                console.error('Không thể tải ảnh đã lưu:', error);
            }
        }

        // Clear saved image
        function clearSavedImage() {
            localStorage.removeItem('userProfileImage');
            localStorage.removeItem('imageLastUpdated');

            // Reset to default images
            const defaultImage = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face';
            updateAllImages(defaultImage);

            showToast('Đã xóa ảnh đại diện đã lưu');
            updateStorageInfo();
        }

        // Update storage information
        function updateStorageInfo() {
            const storageInfo = document.getElementById('storageInfo');
            if (storageInfo) {
                const imageData = localStorage.getItem('userProfileImage');
                const lastUpdated = localStorage.getItem('imageLastUpdated');

                if (imageData && lastUpdated) {
                    const updateDate = new Date(lastUpdated);
                    const imageSize = Math.round((imageData.length * 0.75) / 1024); // Approximate size in KB
                    storageInfo.innerHTML = `
                        Ảnh được lưu: ${updateDate.toLocaleString('vi-VN')}<br>
                        Kích thước: ~${imageSize} KB
                    `;
                } else {
                    storageInfo.textContent = 'Chưa có ảnh nào được lưu';
                }
            }
        }

        // Cart Management
        function initializeCart() {
            // Quantity buttons
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('qty-btn')) {
                    const isPlus = e.target.classList.contains('plus');
                    const qtyElement = e.target.parentElement.querySelector('.qty-value');
                    let currentQty = parseInt(qtyElement.textContent);
                    
                    if (isPlus) {
                        currentQty++;
                    } else if (currentQty > 1) {
                        currentQty--;
                    }
                    
                    qtyElement.textContent = currentQty;
                    updateCartItemTotal(e.target.closest('.cart-item'));
                    updateCartTotals();
                }
                
                // Remove item buttons
                if (e.target.closest('.remove-item')) {
                    const cartItem = e.target.closest('.cart-item');
                    cartItem.style.animation = 'slideOut 0.3s ease-in-out';
                    
                    setTimeout(() => {
                        cartItem.remove();
                        updateCartTotals();
                        updateCartBadge();
                        showToast('Đã xóa sản phẩm khỏi giỏ hàng');
                    }, 300);
                }
            });
            
            // Initial cart calculation
            updateCartTotals();
        }

        function updateCartItemTotal(cartItem) {
            const price = parseInt(cartItem.getAttribute('data-price'));
            const qty = parseInt(cartItem.querySelector('.qty-value').textContent);
            const total = price * qty;
            
            cartItem.querySelector('.item-total').textContent = formatCurrency(total);
        }

        function updateCartTotals() {
            const cartItems = document.querySelectorAll('.cart-item');
            let subtotal = 0;
            
            cartItems.forEach(item => {
                const price = parseInt(item.getAttribute('data-price'));
                const qty = parseInt(item.querySelector('.qty-value').textContent);
                subtotal += price * qty;
            });
            
            const discount = 2000000; // 2M discount
            const finalTotal = subtotal - discount;
            
            document.getElementById('subtotal').textContent = formatCurrency(subtotal);
            document.getElementById('total').textContent = formatCurrency(finalTotal);
        }

        function updateCartBadge() {
            const cartItems = document.querySelectorAll('.cart-item');
            cartBadge.textContent = cartItems.length;
            
            if (cartItems.length === 0) {
                cartBadge.style.display = 'none';
            }
        }

        function formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        }

        // Dark Mode
        function initializeDarkMode() {
            // Check for saved dark mode preference
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                darkModeToggle.checked = true;
            }
            
            darkModeToggle.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('darkMode', 'true');
                    showToast('Đã chuyển sang chế độ tối');
                } else {
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('darkMode', 'false');
                    showToast('Đã chuyển sang chế độ sáng');
                }
            });
        }

        // Order Filters
        function initializeOrderFilters() {
            const orderFilter = document.getElementById('orderFilter');
            
            orderFilter.addEventListener('change', function() {
                const filterValue = this.value;
                const orderCards = document.querySelectorAll('.order-card');
                
                orderCards.forEach(card => {
                    const status = card.querySelector('.order-status').classList[1]; // Get status class
                    
                    if (filterValue === 'all' || status === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.3s ease-in-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                showToast(`Đã lọc đơn hàng theo: ${this.options[this.selectedIndex].text}`);
            });
        }

        // Toast Notification
        function showToast(message, type = 'success') {
            toastMessage.textContent = message;
            
            // Set toast color based on type
            if (type === 'error') {
                toast.style.background = '#ef4444';
            } else {
                toast.style.background = '#10b981';
            }
            
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Enhanced button interactions
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('no-effect')) {
                e.target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 150);
            }
        });



        // Smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth';