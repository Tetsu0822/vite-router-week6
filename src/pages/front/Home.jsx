import useProducts from "../../hooks/useProjects";
import newIcon from "../../assets/new-icon.png";
import ProductCard from "../../components/ProductCard";

function Home() {
    const { products, loading, error } = useProducts();

    return (
        <>
        <div className="container">
            <div className="d-flex justify-content-center align-items-center my-5">
                <img src={newIcon} alt="New Icon" className="me-3" style={{ width: "24px", height: "24px" }} />
                <h2 className="h4 text-primary-700">新品上架</h2>
            </div>
            {loading &&
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">載入中...</span>
            </div>
            }
            {error && <p>發生錯誤：{error.message}</p>}
            {!loading && !error && (
                <>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {products.slice(0, 6).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            </>
            )}
        </div>
        </>
    )
}

export default Home