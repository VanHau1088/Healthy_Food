


const menuData = [
    {
        id: 1,
        name: "Mì Udon Kiểu Nhật Xốt Kem Nấm & Tôm Tươi",
        price: 11,
        description: "Mì Udon, tôm tươi, nấm các loại, sữa hạt không đường, hành tây, tỏi, rau mùi tây",
        image: "/assets/images/menu1.jpg",
        category: "main",
        rating: 5,
        isVegan: false,
    },
    {
        id: 2,
        name: "Bún Rau Củ Tôm Hấp Mè Đen & nấm kim châm",
        price: 14,
        description: "Bún rau củ (100g), tôm hấp (100g), cải bó xôi (50g), nấm kim châm (30g), sốt mè đen (10g).",
        image: "/assets/images/menu2.jpg",
        category: "main",
        rating: 5,
        isVegan: true
    },
    {
        id: 3,
        name: "Cơm Gạo Lứt Nấm Truffle và Ức Gà Nướng Thảo Mộc",
        price: 9,
        description: "Gạo lứt, ức gà, nấm truffle/dầu truffle, bông cải xanh/đậu que, tỏi, hành tây, thảo mộc khô.",
        image: "/assets/images/menu3.jpg",
        category: "main",
        rating: 5,
        isVegan: true
    },
    {
        id: 4,
        name: "Mì Konjac Cá Tuyết Áp Chảo Sốt Chanh Dây",
        price: 12,
        description: "Mì konjac (100g), cá tuyết (100g), zucchini (50g), ớt chuông (30g), sốt chanh dây (10g).",
        image: "/assets/images/menu2.jpg",
        category: "main",
        rating: 4,
        isVegan: false
    },
    {
        id: 5,
        name: "Cà Ri Gà Tofu Kiểu Ấn Độ Dùng Kèm Bánh Mì Nguyên Cám Nướng",
        price: 8,
        description: "Ức gà, đậu phụ, nước cốt dừa light, cà ri powder, khoai lang, bông cải xanh, đậu que, hành tây, gừng, tỏi.",
        image: "/assets/images/menu5.jpg",
        category: "main",
        rating: 5,
        isVegan: false
    },
    {
        id: 6,
        name: "Chả lá lốt yến mạch - đậu lăng",
        price: 16,
        description: "Đậu lăng (50g), yến mạch (20g), lá lốt, nấm hương, hành tây, tiêu.",
        image: "/assets/images/food1.png",
        category: "side",
        rating: 5,
        isVegan: false
    },
    {
        id: 7,
        name: "Gỏi nấm đùi gà - dưa leo - mè rang",
        price: 10,
        description: "Nấm đùi gà (50g), dưa leo (50g), mè rang (5g), nước sốt mắm chay tỏi ớt",
        image: "/assets/images/food2.png",
        category: "side",
        rating: 4,
        isVegan: true
    },
    {
        id: 8,
        name: "Bông Cải Xanh Xào Tỏi & Hạnh Nhân Lát",
        price: 6,
        description: "Bông cải xanh, tỏi, dầu olive, hạnh nhân lát.",
        image: "/assets/images/food3.png",
        category: "side",
        rating: 4,
        isVegan: true
    },  {
        id: 9,
        name: "Rau Củ Hấp Sốt Hạt Điều ",
        price: 8,
        description: "Bông cải trắng (50g), cà rốt (50g), đậu que (40g), sốt hạt điều (10g).",
        image: "/assets/images/menu5.jpg",
        category: "side",
        rating: 5,
        isVegan: true
    },
    {
        id: 10,
        name: "Gỏi Bưởi Tôm Nướng & Lạc Rang",
        price: 16,
        description: "Bưởi, tôm, hành tây, rau răm, ớt, lạc rang.",
        image: "/assets/images/food1.png",
        category: "side",
        rating: 5,
        isVegan: true
    },
    {
        id: 11,
        name: "Salad Quinoa Chay & sốt tahnini",
        price: 10,
        description: "Salad quinoa với rau củ tươi, hạt chia và sốt tahini tự nhiên.",
        image: "/assets/images/food2.png",
        category: "vegan",
        rating: 4,
        isVegan: true
    },
    {
        id: 12,
        name: "Pudding Hạt Chia Dừa - Mật ông & xoài",
        price: 6,
        description: "Hạt chia (20g), sữa dừa (100ml), mật ong (5g), xoài (20g).",
        image: "/assets/images/food3.png",
        category: "vegan",
        rating: 4,
        isVegan: false
    },
    {
        id: 13,
        name: "Chè Dưỡng Nhan Tuyết Yến & Hạt Chia",
        price: 11,
        description: "Tuyết yến, nhựa đào, táo đỏ, long nhãn, kỷ tử, hạt chia, đường phèn/đường ăn kiêng.",
        image: "/assets/images/menu1.jpg",
        category: "vegan",
        rating: 5,
        isVegan: false,
    },
    {
        id: 14,
        name: "Smoothie bơ - cacao - hạnh nhân",
        price: 14,
        description: "Bơ (1/2 quả), cacao nguyên chất (5g), hạnh nhân (10g), sữa hạnh nhân không đường (100ml).",
        image: "/assets/images/menu2.jpg",
        category: "main",
        rating: 5,
        isVegan: false
    },
    {
        id: 15,
        name: "Bánh Muffin Chuối Yến Mạch ",
        price: 9,
        description: "Yến mạch, chuối chín, trứng, mật ong/đường ăn kiêng, bột nở, hạt óc chó/hạnh nhân",
        image: "/assets/images/menu3.jpg",
        category: "main",
        rating: 5,
        isVegan: true
    },
    {
        id: 16,
        name: "Sữa Chua Hy Lạp Trái Cây Tươi",
        price: 12,
        description: "Sữa chua Hy Lạp (100g), dâu tây (30g), việt quất (20g).",
        image: "/assets/images/menu2.jpg",
        category: "main",
        rating: 4,
        isVegan: false
    },
    {
        id: 17,
        name: "Nước ép Xanh Detox",
        price: 8,
        description: "Cần tây, cải bó xôi, táo xanh, dưa chuột, gừng, một chút chanh tươi.",
        image: "/assets/images/menu5.jpg",
        category: "main",
        rating: 5,
        isVegan: false
    },
    {
        id: 18,
        name: "Detox cam - chanh - bạc hà - mật ong",
        price: 16,
        description: "Cam vàng (50g), chanh vàng (10g), bạc hà, mật ong (5ml), nước lọc",
        image: "/assets/images/food1.png",
        category: "side",
        rating: 5,
        isVegan: false
    },
    {
        id: 19,
        name: "Trà sen matcha - sữa hạnh nhân",
        price: 10,
        description: "Bột matcha (5g), nước trà sen ủ lạnh, sữa hạnh nhân không đường (100ml).",
        image: "/assets/images/food2.png",
        category: "side",
        rating: 4,
        isVegan: false
    },
    {
        id: 20,
        name: "Trà Kombucha Nhà Làm Vị Đào & Hạt Chia",
        price: 6,
        description: "Trà Kombucha nguyên bản, puree đào tươi, hạt chia. (Không thêm đường hoặc rất ít đường ăn kiêng nếu cần).",
        image: "/assets/images/food3.png",
        category: "side",
        rating: 4,
        isVegan: false
    },  {
        id: 21,
        name: "Sữa Hạt Hạnh Nhân & Hạt Điều Không Đường",
        price: 8,
        description: "Hạt hạnh nhân, hạt điều, nước lọc, một chút muối hồng.",
        image: "/assets/images/menu5.jpg",
        category: "side",
        rating: 5,
        isVegan: false
    },
    {
        id: 22,
        name: "Trà Hoa Đậu Biếc & Chanh Dây",
        price: 16,
        description: "Hoa đậu biếc khô, chanh dây tươi, nước lọc. (Có thể thêm chút mật ong/đường ăn kiêng).",
        image: "/assets/images/food1.png",
        category: "side",
        rating: 5,
        isVegan: false
    },
    {
        id: 23,
        name: "Cà Phê Đen Cold Brew & Nước Dừa Tươi",
        price: 10,
        description: "Cà phê Cold Brew (100% Arabica), nước dừa tươi",
        image: "/assets/images/food2.png",
        category: "vegan",
        rating: 4,
        isVegan: false
    },
    {
        id: 24,
        name: "Nước Ép Thanh Long Đỏ và Húng Quế",
        price: 6,
        description: "Thanh long đỏ ngọt dịu kết hợp với húng quế thơm nồng, tạo vị lạ miệng, tươi mát, giàu vitamin C. Thích hợp làm món signature cho quán.",
        image: "/assets/images/food3.png",
        category: "coffee",
        rating: 4,
        isVegan: false
    },
    {
        id: 25,
        name: "Sinh Tố Hạt Dẻ Cười và Dưa Gang",
        price: 10,
        description: "Dưa gang ngọt mát kết hợp sữa hạt dẻ cười béo thơm, điểm xuyết hạt chia, tạo trải nghiệm uống sang trọng, không giống bất kỳ sinh tố nào.",
        image: "/assets/images/food2.png",
        category: "vegan",
        rating: 4,
        isVegan: true
    },
    {
        id: 26,
        name: "Nước Ép Ổi Hồng và Cải Bó Xôi",
        price: 6,
        description: "Ổi hồng ngọt thơm kết hợp cải bó xôi giàu chất xơ, tạo màu xanh hồng độc đáo, vị lạ nhưng dễ uống, giàu vitamin.",
        image: "/assets/images/food3.png",
        category: "coffee",
        rating: 4,
        isVegan: false
    },
    
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





