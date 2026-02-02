import { NavLink } from "react-router";

function Side() {
    const category = {
        "成品": ["蝴蝶結"],
        "材料": ["帶子", "夾子", "貼片"],
    };

    return (
        <aside className="side-bar">
            <NavLink to="/product" className="side-link">
                全部商品
            </NavLink>
            {/* 父分類與子分類 */}
            {Object.entries(category).map(([parent, children]) => (
                <div key={parent} className="side-category">
                    <div className="side-category-title">{parent}</div>
                    {children.map((child) => (
                        <NavLink
                            key={child}
                            to={`/product/category/${child}`}
                            className={({ isActive }) =>
                                isActive ? "side-link active" : "side-link"
                            }
                        >
                            {child}
                        </NavLink>
                    ))}
                </div>
            ))}
            <NavLink to="/cart" className={({ isActive }) =>
                isActive ? "side-link active" : "side-link"
            }>
                購物車
            </NavLink>
        </aside>
    )
}

export default Side;