import axios from "axios";
import Swal from "sweetalert2";
import { ShoppingCart } from "lucide-react";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;

function ProductCard({ product }) {
    const addCart = async (id) => {
        const url = `${VITE_API_BASE}/api/${VITE_API_PATH}/cart`;
        const data = {
            data: {
                product_id: id,
                qty: 1
            }
        };
        try {
            const response = await axios.post(url, data);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false, // 關閉預設按鈕，改用 html 裡的連結
                timer: 3000,
                timerProgressBar: false,
                background: '#fff',
                customClass: {
                    popup: 'my-cart-toast-popup',
                    htmlContainer: 'my-cart-html-container' // 增加這行來精準控制內容區
                },
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });

            Toast.fire({
                html: `
                    <div class="cart-toast-content">
                        <span class="toast-text">商品已加入購物車！</span>
                        <a href="/cart" class="toast-link">立即查看</a>
                    </div>
                `
            });
        } catch (error) {
            console.log("Error adding to cart:", error);
        }
    };

    return (
    <>
    <div className="col">
        <div
            key={product.id}
            className="card product-card border-0 h-100"
            onClick={() => window.location.href = `${import.meta.env.BASE_URL}#product/${product.id}`}
        >
            <div className="product-image">
                <img src={product.imageUrl} alt={product.title} />
            </div>
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1 ps-3">
                        <h3 className="product-title mb-1">{product.title}</h3>
                        <p className="text-p-20-b text-secondary-700">NT${product.price}</p>
                    </div>
                    <div className="product-cart-btn">
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addCart(product.id);
                        }}><ShoppingCart color={"#493B3F"} /></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default ProductCard;

// 建議在全域 SCSS 加入以下自訂樣式來美化 SweetAlert2 彈窗：
/*
.swal2-border {
    border: 1px solid #222;
    border-radius: 0;
}
.swal2-title-custom {
    font-size: 1rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.swal2-confirm-custom {
    font-size: 0.95rem;
    color: #222;
    background: none;
    border: none;
    box-shadow: none;
    font-weight: 500;
}
*/