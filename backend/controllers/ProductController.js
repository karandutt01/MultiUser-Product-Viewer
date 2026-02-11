const { db, bucket } = require('../config/firebaseAdmin');

const addProduct = async(req, res) => {

  try {

    const {title, price, productDesc } = req.body

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileName = `products/images/${req.file.originalname}`;
    const file = bucket.file(fileName);

    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    // Generate signed URL (recommended way)
    const [imageUrl] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2030',
    });

    const addProduct = await db.collection('products').add({
      title,
      price,
      productDesc,
      imageUrl,
      user_id:req.user.user_id
    });

    if(addProduct){
      return res.status(201).json({message:"Product Added Successfullly"})
    }else{
      return res.json({error: "Product failed to add"})
    }

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

}


const productList = async(req, res) => {
  try {
    const snapshot = await db.collection('products')
                            .where('user_id', '==', req.user.user_id).get();
    
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (!products.length) {
      return res.status(200).json({ 
        doc: [],
        message:"No Products found"
      })
    } else {
      return res.status(200).json({ doc: products })
    }

  } catch (error) {
    return res.json({error: error.message})
  }
}


module.exports = {
  addProduct,
  productList
}