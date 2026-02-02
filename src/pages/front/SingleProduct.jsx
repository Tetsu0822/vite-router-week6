import { useParams } from "react-router";
import useProducts from "../../hooks/useProjects";
import { useState } from "react";
import { ShoppingCart, Minus, Plus, Heart } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
    const params = useParams();
    const { id } = params;
    const { products, loading, error } = useProducts();
    const [qty, setQty] = useState(1);
    const category = {
        "成品": ["蝴蝶結"],
        "材料": ["帶子", "夾子", "貼片"],
    };

    // 加入購物車功能
    const addToCart = async (productId, qty) => {
        try {
            await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`, {
                data: {
                    product_id: productId,
                    qty: qty
                }
            });
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
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "加入購物車失敗！"
            });
        }
    };

    // 立即購買
    const buyNow = async (productId, qty) => {
        try {
            await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`, {
                data: {
                    product_id: productId,
                    qty: qty
                }
            });
            window.location.href = "/cart";
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "無法立即購買"
            });
        }
    };
    return (
        <>
        <div className="container my-5">
            {
            loading &&
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">載入中...</span>
            </div>
            }
            {!loading && !error && (
                <>
                {/* 麵包屑導航 首頁 / 父分類 / 子分類 / 商品名稱 */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">首頁</a></li>
                        {/* 以 category 顯示父分類與子分類 */}
                        {products.filter(product => product.id === id).map(filteredProduct => {
                            let parentCategory = "";
                            let childCategory = filteredProduct.category;
                            for (const [parent, children] of Object.entries(category)) {
                                if (children.includes(childCategory)) {
                                    parentCategory = parent;
                                    break;
                                }
                            }
                            return (
                                <>
                                    <li className="breadcrumb-item">
                                        <a
                                            href="#"
                                            onClick={e => {
                                                e.preventDefault();
                                                window.location.href = `#/product/category/${parentCategory}`;
                                            }}
                                        >
                                            {parentCategory}
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a
                                            href="#"
                                            onClick={e => {
                                                e.preventDefault();
                                                window.location.href = `#/product/category/${childCategory}`;
                                            }}
                                        >
                                            {childCategory}
                                        </a>
                                    </li>
                                </>
                            );
                        })}
                        {products.filter(product => product.id === id).map(filteredProduct => (
                            <li className="breadcrumb-item active" aria-current="page" key={filteredProduct.id}>{filteredProduct.title}</li>
                        ))}
                    </ol>
                </nav>

                {products.filter(product => product.id === id).map(filteredProduct => (
                    <div key={filteredProduct.id}>
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <img src={filteredProduct.imageUrl} alt={filteredProduct.title} className="img-fluid"
                                style={{
                                    width: "100%",
                                    maxHeight: "420px",
                                    borderRadius: "16px"
                                }}
                            />
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <h2 className="h3 text-gray-900">{filteredProduct.title}</h2>
                                <p className="text-p-20-r">{filteredProduct.description}</p>
                                <h3 className="h6 text-gray-900 mb-4">${filteredProduct.price}</h3>
                                <div className="d-flex align-items-center mb-4" style={{gap: "1rem"}}>
                                    <button
                                        className="btn border-0"
                                        type="button"
                                        onClick={() => setQty(qty => Math.max(1, qty - 1))}
                                    ><Minus /></button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={qty}
                                        onChange={e => setQty(Math.max(1, Number(e.target.value)))}
                                        className="text-center text-p-24 border-0"
                                        style={{width: 48, padding:"0"}}
                                    />
                                    <button
                                        className="btn border-0"
                                        type="button"
                                        onClick={() => setQty(qty => qty + 1)}
                                    ><Plus /></button>
                                </div>
                                <div className="d-flex align-items-center" style={{gap: "24px"}}>
                                    <button
                                        className="btn text-primary-500"
                                        type="button"
                                        style={{
                                            padding: "16px 48px",
                                            border: "1px solid #E3879F",
                                            borderRadius: "0px",
                                        }}
                                        onClick={() => addToCart(filteredProduct.id, qty)}
                                    >加入購物車</button>
                                    <button
                                        className="btn text-white align-items-center d-flex bg-primary-700"
                                        type="button"
                                        style={{
                                            padding: "16px 48px",
                                            borderRadius: "0px",
                                        }}
                                        onClick={() => buyNow(filteredProduct.id, qty)}
                                    >立即購買<ShoppingCart className="ms-1" size={28} /></button>
                                    <button className="btn border-0" type="button"><Heart /> 加入收藏</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </>
            )}
        </div>
        </>
    )
}

export default SingleProduct;