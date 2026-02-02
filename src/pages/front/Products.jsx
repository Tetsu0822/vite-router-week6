import useProducts from "../../hooks/useProjects";
import ProductCard from "../../components/ProductCard";
import Side from "./Side";
import { useParams } from "react-router";

function Products() {
    const { products, loading, error } = useProducts();
    const params = useParams();
    // 取得子分類參數
    const child = params.child;
    // 根據 child 參數篩選商品，假設 product 物件有 category 屬性
    const filteredProducts = child
        ? products.filter(product => product.category === child)
        : products;
    return (
        <>
        <div className="container my-5">
            <div className="row">
                <div className="d-none d-md-block col-md-2">
                    <Side />
                </div>
                <div className="col-md-10">
                    {loading &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">載入中...</span>
                    </div>}
                    {error && products.length === 0 && <p>發生錯誤或尚無資料，請稍後再試。</p>}
                    {
                        !loading && !error && (<>
                        <div className="cate-title" style={{borderLeft:"6px solid #D75E7E", height:"43px",marginBottom:"12px",paddingLeft:"12px", display:"flex", alignItems:"start"}}>
                            <h2 className="h4 text-primary-700">{child ? child : "全部商品"}</h2>
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        {filteredProducts.length === 0 && (<>
                        <p className="m-3">此分類下尚無商品。</p>
                        </>)}
                        </>)
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default Products;