const {Sequelize} = require('sequelize')

const connection = new Sequelize(process.env.DB,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    dialect:'mysql'
})

async function init(){
    try{
        await connection.authenticate()
        // await connection.sync({alter:true})
        console.log('Connected to database')
    }catch(e){
        console.log(`Error ${e}`)
    }
}
init()


module.exports = connection