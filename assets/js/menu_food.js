


const menuData = [
    {
        id: 1,
        name: "Stracciatella",
        price: 11,
        description: "tomatoes, nori, feta cheese, mushrooms, rice noodles, corn, shrimp.",
        image: "/assets/images/menu1.jpg",
        category: "coffee",
        rating: 5,
        isVegan: false,
    },
    {
        id: 2,
        name: "Chevrefrit au miel",
        price: 14,
        description: "tomatoes, nori, feta cheese, mushrooms, rice noodles, corn, shrimp.",
        image: "/assets/images/menu2.jpg",
        category: "main",
        rating: 5,
        isVegan: false
    },
    {
        id: 3,
        name: "Saumon Gravlax",
        price: 9,
        description: "tomatoes, nori, feta cheese, mushrooms, rice noodles, corn, shrimp.",
        image: "/assets/images/menu3.jpg",
        category: "sushi",
        rating: 5,
        isVegan: true
    },
    {
        id: 4,
        name: "Pad Thai Đặc Biệt",
        price: 12,
        description: "Mì Pad Thai truyền thống với tôm, đậu phụ, giá đỗ và nước sốt tamarind đậm đà.",
        image: "/assets/images/menu4.jpg",
        category: "main",
        rating: 4,
        isVegan: false
    },
    {
        id: 5,
        name: "Cà phê Việt Nam",
        price: 8,
        description: "Cà phê phin truyền thống với sữa đặc, hương vị đậm đà khó quên.",
        image: "/assets/images/menu5.jpg",
        category: "coffee",
        rating: 5,
        isVegan: false
    },
    {
        id: 6,
        name: "Sushi Rainbow Roll",
        price: 16,
        description: "Sushi cuộn cầu vồng với cá hồi, cá ngừ, bơ và dấm rice đặc biệt.",
        image: "/assets/images/food1.png",
        category: "sushi",
        rating: 5,
        isVegan: false
    },
    {
        id: 7,
        name: "Salad Quinoa Chay",
        price: 10,
        description: "Salad quinoa với rau củ tươi, hạt chia và sốt tahini tự nhiên.",
        image: "/assets/images/food2.png",
        category: "vegan",
        rating: 4,
        isVegan: true
    },
    {
        id: 8,
        name: "Trà Sữa Thái Xanh",
        price: 6,
        description: "Trà sữa Thái xanh thơm ngon với topping trân châu đen.",
        image: "/assets/images/food3.png",
        category: "coffee",
        rating: 4,
        isVegan: false
    },
    {
        id: 9,
        name: "Phở Bò Đặc Biệt",
        price: 13,
        description: "Phở bò truyền thống với nước dùng trong, thịt bò tái và các loại rau thơm.",
        image: "/assets/images/MOCHI GẠO LỨT NHÂN ĐẬU ĐỎ.png",
        category: "main",
        rating: 5,
        isVegan: false
    },
    {
        id: 10,
        name: "Buddha Bowl",
        price: 11,
        description: "Bát chay đầy màu sắc với quinoa, khoai lang nướng, brokocli và hummus.",
        image: "/assets/images/CHẢ LÁ LỐT.jpg",
        category: "vegan",
        rating: 4,
        isVegan: true
    },
    {
        id: 11,
        name: "Maki Set Deluxe",
        price: 18,
        description: "Set maki cao cấp gồm 24 miếng với các loại cá tươi ngon nhất.",
        image: "/assets/images/BÁNH QUY ĂN THEO PT.jpg",
        category: "sushi",
        rating: 5,
        isVegan: false
    },
    {
        id: 12,
        name: "Smoothie Bowl Nhiệt Đới",
        price: 9,
        description: "Smoothie bowl với xoài, dừa, granola và các loại hạt dinh dưỡng.",
        image: "/assets/images/3. Bánh Cuốn Hạt Gai Dầu (Hemp Seed) với Nhân Rau Củ Fermented.jpg",
        category: "vegan",
        rating: 4,
        isVegan: true
    }
];

// Biến toàn cục
let cart = [];
let filteredData = [...menuData];

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        renderMenu(menuData);
        setupEventListeners();
        loadCartFromStorage();
    }, 1000);
});

// Hiển thị/ẩn loading
function showLoading() {
    document.getElementById('loading').classList.add('show');
    document.getElementById('menuGrid').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').classList.remove('show');
    document.getElementById('menuGrid').style.display = 'grid';
}

// Render menu
function renderMenu(data) {
    const menuGrid = document.getElementById('menuGrid');
    const noResults = document.getElementById('noResults');
    
    if (data.length === 0) {
        menuGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    menuGrid.style.display = 'grid';
    noResults.style.display = 'none';

    menuGrid.innerHTML = data.map(item => `
        <div class="menu-item fade-in" data-category="${item.category}">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                ${item.isVegan ? '<div class="vegan-badge">🌱 Vegan</div>' : ''}
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <div class="menu-item-price">$${item.price}</div>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="rating">
                    ${generateStars(item.rating)}
                </div>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    `).join('');
}

// Tạo sao đánh giá
function generateStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Thiết lập event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(handleSearch, 300));

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });

    // Đóng cart khi click bên ngoài - CẢI THIỆN
    document.addEventListener('click', function(e) {
        const cartBox = document.getElementById('cartBox');
        const cartBtn = document.querySelector('.shopping-cart-btn');
        
        // Kiểm tra xem click có phải từ bên trong cart box không
        if (!cartBox.contains(e.target) && !cartBtn.contains(e.target)) {
            cartBox.classList.remove('active');
        }
    });

    // Ngăn chặn đóng cart khi click vào các element bên trong cart
    const cartBox = document.getElementById('cartBox');
    cartBox.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Xử lý tìm kiếm
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredData = menuData.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
    
    showLoading();
    setTimeout(() => {
        hideLoading();
        renderMenu(filteredData);
    }, 300);
}

// Xử lý lọc danh mục
function handleFilter(e) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const category = e.target.dataset.category;
    
    if (category === 'all') {
        filteredData = [...menuData];
    } else {
        filteredData = menuData.filter(item => item.category === category);
    }

    showLoading();
    setTimeout(() => {
        hideLoading();
        renderMenu(filteredData);
    }, 300);
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(itemId) {
    const item = menuData.find(product => product.id === itemId);
    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showNotification(`Đã thêm ${item.name} vào giỏ hàng!`);
}

// Cập nhật giao diện giỏ hàng
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const totalAmount = document.getElementById('totalAmount');
    
    // Cập nhật số lượng
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Cập nhật danh sách sản phẩm
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Giỏ hàng của bạn đang trống</p>
                <p>Hãy thêm một số món ăn ngon!</p>
            </div>
        `;
        cartTotal.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="img-box">
                    <img src="${item.image}" alt="${item.name}" class="product-img" width="50" height="50">
                </div>
                <div class="cart-item-info">
                    <div class ="card-item-info_text">
                        <h5 class="product-name">${item.name}</h5>
                        <p class="product-price">$${item.price}</p>
                    </div>
                    <div class="product-quantity">
                        <div class="product-quantity_button">
                            <button class="quantity-btn" onclick="updateQuantity(event, ${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(event, ${item.id}, 1)">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeFromCart(event, ${item.id})">Xóa</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Tính tổng tiền
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;
        cartTotal.style.display = 'block';
    }
}

// Cập nhật số lượng sản phẩm - THÊM EVENT PARAMETER
function updateQuantity(event, itemId, change) {
    // Ngăn chặn event bubbling
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(event, itemId);
        } else {
            updateCartUI();
            saveCartToStorage();
        }
    }
}

// Xóa sản phẩm khỏi giỏ hàng - THÊM EVENT PARAMETER
function removeFromCart(event, itemId) {
    // Ngăn chặn event bubbling
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    saveCartToStorage();
    showNotification('Đã xóa sản phẩm khỏi giỏ hàng!');
}

// Xóa toàn bộ giỏ hàng - THÊM EVENT PARAMETER
function clearCart(event) {
    // Ngăn chặn event bubbling
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    if (cart.length === 0) {
        showNotification('Giỏ hàng đã trống!');
        return;
    }
    
    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
        cart = [];
        updateCartUI();
        saveCartToStorage();
        showNotification('Đã xóa toàn bộ giỏ hàng!');
    }
}

// Thanh toán - THÊM EVENT PARAMETER
function checkout(event) {
    // Ngăn chặn event bubbling
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    if (cart.length === 0) {
        showNotification('Giỏ hàng trống!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (confirm(`Xác nhận thanh toán?\nSố món: ${itemCount}\nTổng tiền: $${total.toFixed(2)}`)) {
        showNotification('Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ chuẩn bị món ăn ngay.');
        cart = [];
        updateCartUI();
        saveCartToStorage();
        toggleCart(); // Đóng giỏ hàng
    }
}

// Toggle giỏ hàng
// function toggleCart() {
//     const cartBox = document.getElementById('cartBox');
//     cartBox.classList.toggle('active');
// }

// Lưu giỏ hàng vào localStorage
function saveCartToStorage() {
    localStorage.setItem('foodhubCart', JSON.stringify(cart));
}

// Tải giỏ hàng từ localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('foodhubCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Hiển thị thông báo
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideInOut 3s ease;
        text-align: center;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Khởi tạo
updateCartUI();





