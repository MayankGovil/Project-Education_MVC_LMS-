require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const paymentController = async(req,res)=>{
    const {products} = req.body;
    realProducts = products.cart;
    console.log(products);


    const lineItems = realProducts.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name,
                images:["https://www.wscubetech.com/images/wscube-tech-logo.svg"]
            },
            unit_amount:product.amount * 100,
        },
        quantity:product.qunt
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/payment-successful",
        cancel_url:"http://localhost:3000/payment-failed",
    });



    res.json({id:session.id});

    // const transactionDetails = {
    //     transaction_id: session.id,
    //     transaction_amt:  session.amount_total,
    //     transaction_txs: session.automatic_tax,
    //     transaction_created: session.created,
    //     payment_types: session.payment_method_types,
    //     transaction_details: session.total_details,
    //     user: products.user
    // };

    // console.log(session.status);

    // if(session.status == 'open')
    // {

    //     try
    //     {
    //         const dataToInsert = new  Transaction(transactionDetails);
    //         const responseData = await dataToInsert.save();

    //         console.log(responseData);
    //     }
    //     catch(err)
    //     {
    //         console.log(err)
    //     }
        
        
    // };
 
};


module.exports = paymentController;