import React from 'react';
import {Grid} from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles';

// const products = [
//     { id: 1, name: 'Shoes', description: 'Running shoes. ', price: 'Rp5', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0f8a1594-d70f-4e9e-a902-b5a64c39c59a/crater-impact-shoes-MrrCn3.png'},
//     { id: 2, name: 'Macbook', description: 'Apple macbook ', price: 'Rp10', image: 'https://cdn.eraspace.com/pub/media/catalog/product/m/a/macbook_air_m1_gold_1.jpg'},
// ]

const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
};

export default Products;