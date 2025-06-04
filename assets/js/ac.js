 // DOM Elements
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
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
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
    alert('Đơn hàng của bạn đã được xử lý!');
    localStorage.removeItem('foodhubCart'); // Xóa giỏ hàng sau khi thanh toán
    loadCartFromStorage();
}

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




        
document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".content-section");

    navItems.forEach(item => {
        item.addEventListener("click", function() {
            // Xóa lớp active khỏi tất cả mục
            navItems.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");

            // Hiển thị phần nội dung tương ứng
            const sectionId = this.dataset.section;
            sections.forEach(sec => sec.classList.remove("active"));
            document.getElementById(sectionId).classList.add("active");
        });
    });
});
