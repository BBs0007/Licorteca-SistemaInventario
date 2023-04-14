const models = {
    usersModel: require('./nosql/users'), 
    productosModel: require('./nosql/productos'),
    storageModel: require('./nosql/storage'),
    salesModel: require('./nosql/sales'),
    purchasesModel: require('./nosql/purchases'),
    proveedoresModel: require('./nosql/proveedores'),
    catalogosModel: require('./nosql/catalogos')
}

module.exports = models;