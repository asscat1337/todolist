const {Router} = require('express')
const TODO = require('../models/TODO')

const router = Router()


router.post('/add',async(req,res)=>{
    const {title,complete} = req.body
    await TODO.create({title,complete})
    .then(data=>res.json(data))
})

router.post('/update',async(req,res)=>{
    const {id,complete} = req.body

     await TODO.update({complete:!complete},{
         where:{
             id
         }
     }).then(res.json({'message':`${!complete ? 'Задача завершена' : 'Задача возобновилась'}`}))
})

router.post('/delete',async(req,res)=>{
    const {id} = req.body
    console.log(req.body,id)
    await TODO.destroy({
        where:{
            id
        }
    }).then(res.json({'message':'Задача удалена'}))
})



router.get('/',async(req,res)=>{
    await TODO.findAll()
        .then(data=>res.json(data))
})


module.exports = router