const express = require('express');
const db = require('../data/dbConfig.js')
const router = express.Router();

router.get('/', (req, res)=> {
    db.select('*').from('accounts')
        .then(amount => {
            res.status(200).json(amount);
        })
        .catch(err => {
            res.status(500).json({ message: "error retrieving posts", err });
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.select()
        .from('accounts')
        .where({id})
        .first()
        .then(acc => res.status(200).json(acc))
        .catch(err => res.status(500).json({message: err.message}))
})

router.post('/', (req, res) => {
    const thisPost = req.body;
    db('accounts')
        .insert(thisPost)
        .then(i => {
            res.status(201).json(i);
        })
        .catch(err => {
            res.status(500).json({message: 'failed to create new posts', err})
        })
});
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db('accounts')
        .where({id})
        .update(changes)
        .then(i =>{
            if(i){
                res.json({updated: i})

            }else{
                res.status(404).json({message: 'Invalid id'});
            }

        })
        .catch(err => {
            res.status(500).json({message: "error updating", err})
        })
})
router.delete('/:id', (req,res)=>{
    const {id} = req.params;
    const item = req.body;

    db('accounts')
        .where({id})
        .del(item)
        .then(e =>{
            if(e > 0){
                res.status(200).json({message: 'Deleted!'})
            
            }else{
                res.status(404).json({message: 'Not Found!'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'No luck, Try again!', err})
        })
})
module.exports = router;