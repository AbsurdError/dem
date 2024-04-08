import React, { useEffect, useState } from "react";

export default function Products({isAuth, token}){
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://api-shop.edu.alabuga.space/api-shop/products')
        .then(data => data.json())
        .then(info => setProducts(info.data))
        .catch(error => console.error('Ошибка при загрузке продуктов:', error))
    }, []);

    function addToCart(id){
        fetch(`https://api-shop.edu.alabuga.space/api-shop/cart/${id}`,{
            method: "POST",
            headers: {  "Content-type": "application/json",
                        'Authorization': `Bearer ${token}`}
        })
    }

    const printProducts = products.map(product => {
        return(
        <div className="col" key={product.id}>
            <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">{product.name}</h4>
                </div>
                <div className="card-body">
                    <h1 className="card-title pricing-card-title">{product.price}р.</h1>
                    <p>{product.description}</p>
                    { isAuth && <button type="button" className="w-100 btn btn-lg btn-outline-success" onClick={() => addToCart(product.id)}>Добавить в корзину</button>}
                </div>
            </div>
        </div>
        )
    })
    return(
    <main>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">Каталог товаров</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {printProducts}
        </div>
    </main>
    )
}