import React, { useState } from 'react'
import { dataProducts, categoryPrice, categoryProduct } from '../assets/db'

export default function App() {
    const [checkCtg, setCheckCtg] = useState([])
    const [checkPrice, setCheckPrice] = useState('')

    const checkCategory = product => {
        return checkCtg.filter(item => item.id !== product.id)
    }

    const handleCheck = product => {
        const existing = checkCtg.some(item => item.id === product.id)
        setCheckCtg(existing ? checkCategory(product) : [...checkCtg, product])
    }

    const filterProduct = dataProducts.filter(product => checkCtg.length ? checkCtg.includes(product.type) : product)

    const handleSortPrice = item => {
        setCheckPrice(item)
        dataProducts.sort((a, b) => {
            if (item === 'High to low') {
                return a.price - b.price
            }
            return b.price - a.price
        })
    }

    return (
        <div className='product'>
            <div className='product__left'>
                <div className='ctg__prod'>
                    {categoryProduct.map(item => {
                        return (
                            <div className='ctg__filter-prod' key={item}>
                                <input type="checkbox" id={item} onChange={() => handleCheck(item)} />
                                <label htmlFor={item} className='ctg__filter-prod-name'>
                                    {item}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div className='ctg__price'>
                    {categoryPrice.map(item => {
                        return <div className='ctg__price-item' key={item}>
                            <input type="radio" id={item}
                                checked={checkPrice === item}
                                onChange={() => handleSortPrice(item)}
                            />
                            <label htmlFor={item}>{item}</label>
                        </div>
                    })}
                </div>
            </div>

            <div className='product__right'>
                {filterProduct.map(product => {
                    return (
                        <div className='product__item' key={product.id}>
                            <img src={product.url} alt="" className='product__item-img' />
                            <p className='product__item-name'>{product.title}</p>
                            <p className='product__item-price'>{product.price}$</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
