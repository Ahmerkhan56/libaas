import { Router } from "express"
import Product from "../models/productModel.js"
import { pluck, removeDuplicate, sort } from "js-easify"
let SpamRouter = Router()
SpamRouter.get("/:id/by-ip", async (req, res) => {
    let product = await Product.findById(req.params.id)
    let ips = removeDuplicate(pluck(product.reviews, "ipaddress"))
    let iplist={}
     ips.map(item => {
        let reviews = product.reviews.filter(rev => rev.ipaddress == item)
        if (reviews.length > 1)
            iplist[item]=reviews
    })
    res.send(iplist)
})

SpamRouter.delete("/:id/:ip/by-ip", async (req,res)=>{
    let product=await Product.findById(req.params.id)
    product.reviews=product.reviews.filter(item=>item.ipaddress != req.params.ip)
    product.save()
    res.send("deleted")
})


export default SpamRouter