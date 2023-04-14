const { matchedData } = require("express-validator");
const fs = require("fs");
const {storageModel} = require("../models");
const { handleHttpError } = require("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;


/** Mostrar todos los items
 * @param {*} req 
 * @param {*} res
 * */
const getItems = async (req,res) => {

    try {
        const data = await storageModel.find({});
        res.send({data});
    } catch (e) {
        handleHttpError(res, "error_storages_get_items");
    }

};

/** Mostrar solo un item especifico
 * @param {*} req 
 * @param {*} res
 * */
const getItem = async (req,res) => {

    try {
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({ data });
    } catch (e) {
        
        handleHttpError(res, "error en get item")
    }

};

/** Crear un item
 * @param {*} req 
 * @param {*} res
 * */
const createItem = async (req,res) => {
    
    try {
        const { file} = req;
    //const {body} = req;
        const fileData ={
            filename: file.filename,
            url:`${PUBLIC_URL}/${file.filename}`,
        };
        const data = await storageModel.create(fileData);
        res.send({data});
    } catch (e) {
        console.log(e);
        handleHttpError(res,"error al crear un item")
    }
};




/** Eliminar un registro
 * @param {*} req 
 * @param {*} res
 * */
const deleteItem = async (req,res) => {

    try {
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.findByIdAndDelete({_id:id});
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}` //ruta local donde se guardan las imagenes

        fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted:1
        };

        res.send({ data });
    } catch (e) {
        console.log(e);
        handleHttpError(res, "error en delete item")
    }


};

module.exports = {getItems, getItem, createItem, deleteItem}