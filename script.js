// ==========================================
// 1. 案件資訊資料庫 (以後都在這裡新增/修改)
// ==========================================
const propertiesData = [
    {
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "1,280 萬",
        title: "捷運永寧站 | 中央路高樓層美妝",
        layout: "3房 2廳 2衛",
        size: "35.5 坪",
        feature: "含車位"
    },
    {
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "1,560 萬",
        title: "家樂福商圈 | 質感採光大兩房",
        layout: "2房 2廳 1衛",
        size: "28.2 坪",
        feature: "含平車"
    },
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "2,980 萬",
        title: "裕民路熱鬧商圈 | 黃金收租店面",
        layout: "開放格局",
        size: "40.1 坪",
        feature: "人潮錢潮"
    },
    {
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "3,150 萬",
        title: "信義區吳興街 | 靜巷優質採光宅",
        layout: "3房 2廳 2衛",
        size: "32.0 坪",
        feature: "近捷運"
    },
    {
        image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "1,880 萬",
        title: "文化廣場大樓 | 高樓景觀戶",
        layout: "3房 2廳 2衛",
        size: "38.5 坪",
        feature: "公設齊全"
    },
    
];

// 將物件資料渲染到 HTML 中
const propertiesWrapper = document.getElementById("properties-wrapper");

if (propertiesWrapper) {
    propertiesData.forEach(property => {
        const cardHTML = `
            <div class="property-card">
                <img src="${property.image}" alt="物件照片" class="property-img">
                <div class="property-info">
                    <div class="property-price">${property.price}</div>
                    <h3 class="property-title">${property.title}</h3>
                    <div class="property-details">
                        <span>${property.layout}</span>
                        <span>${property.size}</span>
                        <span>${property.feature}</span>
                    </div>
                </div>
            </div>
        `;
        // 把做好的卡片塞進網頁裡
        propertiesWrapper.innerHTML += cardHTML;
    });
}

// ==========================================
// 2. 手機版漢堡選單切換功能
// ==========================================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        if (navLinks.classList.contains("active")) {
            hamburger.innerHTML = "✕";
        } else {
            hamburger.innerHTML = "☰";
        }
    });

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.innerHTML = "☰";
        });
    });
}

// ==========================================
// 3. 電話號碼防呆機制：限制只能輸入數字
// ==========================================
const phoneInput = document.getElementById("phone");

if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
        if (/[^0-9]/.test(e.target.value)) {
            alert("電話號碼只能輸入數字喔！");
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
        }
        if (e.target.value.length > 10) {
            e.target.value = e.target.value.slice(0, 10);
        }
    });
}

// ==========================================
// 4. 聯絡表單送出模擬功能
// ==========================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        const name = document.getElementById("name").value;
        alert("謝謝您，" + name + "！您的留言已送出，我會盡快與您聯繫。");
        contactForm.reset();
    });
}

// ==========================================
// 5. 精選物件自動輪播功能 (每隔幾秒跳一張)
// ==========================================
if (propertiesWrapper) {
    let autoScrollTimer;

    // 設定啟動自動滑動的函數
    const startAutoScroll = () => {
        // 每 3000 毫秒 (3秒) 執行一次
        autoScrollTimer = setInterval(() => {
            // 抓取第一張卡片，用來計算每次要滑動的距離
            const card = propertiesWrapper.querySelector('.property-card');
            if (!card) return;

            // 每次滑動的距離 = 卡片寬度 + 卡片之間的間距 (約20px)
            const scrollAmount = card.offsetWidth + 20;

            // 檢查是否已經滑到最右邊了
            // (目前滑動距離 + 螢幕上顯示的寬度 >= 裡面所有卡片的總寬度)
            if (propertiesWrapper.scrollLeft + propertiesWrapper.clientWidth >= propertiesWrapper.scrollWidth - 10) {
                // 如果到底了，就瞬間回到最左邊第一張
                propertiesWrapper.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // 如果還沒到底，就繼續往右滑動一張的距離
                propertiesWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 3000); // 3000 代表 3 秒，你想變快或變慢可以改這個數字
    };

    // 設定停止自動滑動的函數
    const stopAutoScroll = () => {
        clearInterval(autoScrollTimer);
    };

    // 網頁載入後，立刻啟動自動滑動
    startAutoScroll();

    // 貼心設計：當使用者的滑鼠移到卡片上，或手機手指碰觸時，暫停滑動
    propertiesWrapper.addEventListener('mouseenter', stopAutoScroll);
    propertiesWrapper.addEventListener('touchstart', stopAutoScroll);

    // 當滑鼠移開，或手機手指離開時，恢復自動滑動
    propertiesWrapper.addEventListener('mouseleave', startAutoScroll);
    propertiesWrapper.addEventListener('touchend', startAutoScroll);
}