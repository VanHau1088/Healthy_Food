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

// Cart elements
const qtyBtns = document.querySelectorAll('.qty-btn');
const removeItemBtns = document.querySelectorAll('.remove-item');
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
    
    // Store original profile data
    storeOriginalProfileData();
});

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

// Profile Edit
function initializeProfileEdit() {
    editProfileBtn.addEventListener('click', function() {
        if (!isEditing) {
            enableProfileEdit();
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
    
    editProfileBtn.onclick = function() {
        cancelProfileEdit();
    };
    
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
    
    // Simulate API call
    setTimeout(() => {
        // Update sidebar info
        document.getElementById('sidebarName').textContent = fullName;
        document.getElementById('sidebarEmail').textContent = email;
        
        // Store new original data
        storeOriginalProfileData();
        
        // Disable editing
        disableProfileEdit();
        
        showToast('Thông tin đã được cập nhật thành công!');
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
    
    editProfileBtn.onclick = function() {
        enableProfileEdit();
    };
}

// Image Upload
function initializeImageUpload() {
    imageOverlay.addEventListener('click', function() {
        imageInput.click();
    });
    
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImage.src = e.target.result;
                    sidebarAvatar.src = e.target.result;
                    showToast('Ảnh đại diện đã được cập nhật!');
                };
                reader.readAsDataURL(file);
            } else {
                showToast('Vui lòng chọn file ảnh hợp lệ', 'error');
            }
        }
    });
}

// Cart Management
function initializeCart() {
    // Quantity buttons
    qtyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const qtyElement = this.parentElement.querySelector('.qty-value');
            let currentQty = parseInt(qtyElement.textContent);
            
            if (action === 'increase') {
                currentQty++;
            } else if (action === 'decrease' && currentQty > 1) {
                currentQty--;
            }
            
            qtyElement.textContent = currentQty;
            updateCartTotals();
            updateCartItemTotal(this.closest('.cart-item'));
        });
    });
    
    // Remove item buttons
    removeItemBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.animation = 'slideOut 0.3s ease-in-out';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartTotals();
                updateCartBadge();
                showToast('Đã xóa sản phẩm khỏi giỏ hàng');
            }, 300);
        });
    });
}

function updateCartItemTotal(cartItem) {
    const price = parseFloat(cartItem.querySelector('.item-price').textContent.replace(/[^\d]/g, ''));
    const qty = parseInt(cartItem.querySelector('.qty-value').textContent);
    const total = price * qty;
    
    cartItem.querySelector('.item-total').textContent = formatCurrency(total);
}

function updateCartTotals() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    cartItems.forEach(item => {
        const total = parseFloat(item.querySelector('.item-total').textContent.replace(/[^\d]/g, ''));
        subtotal += total;
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

// Additional animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-100%);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .cart-item:hover {
        animation: pulse 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);

// Smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading states for buttons
function addLoadingState(button, originalText) {
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Enhanced button interactions
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('no-effect')) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

