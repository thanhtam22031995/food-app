import Video from "../models/video.js";

import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { where } from "sequelize";
import { response } from "../config/response.js";

const model = initModels(sequelize)

const getVideo = async (req, res) => {

    // SELECT * FROM video WHERE user_id = 5
    // [{} , {}]
    let data = await model.video.findAll({
        where: {
            video_id: 5
        }
    })

    data = await model.video.findByPk(5)

    // SELECT * FROM video LIMIT 1
    // {}
    data = await model.video.findOne();

    // SELECT * FROM video JOIN video_type JOIN user
    data = await model.video.findAll({
        include: ["type", "user"]
        // include: [model.video_type, model.users]
    })

    // res.send(data);
    response(res, data, 'Thanh cong', 200)

}

const createVideo = (req, res) => {

}

const updateVideo = (req, res) => {
}

const getVideoType = async (req, res) => {
    let data = await model.video_type.findAll()
    // res.send(data)
    response(res, data, 'Thanh cong', 200)

}

const getVideoWithType = async (req, res) => {
    let { typeId } = req.params;
    let data = await model.video.findAll({
        where: {
            type_id: typeId
        },
        include: ["type", "user"]
    })
    // res.send(data)
    response(res, data, 'Thanh cong', 200)
}

const getVideoPage = async (req, res) => {
    try {
        let { page } = req.params;

        let pageSize = 3
        let index = (page - 1) * pageSize

        // SELECT * FROM video
        // LIMIT index, pageSize
        let data = await model.video.findAll({
            offset: index,
            limit: pageSize,
            include: ["type", "user"]
        })
        let totalItem = await model.video.count()
        let totalPage = Math.ceil(totalItem / pageSize)

        response(res, { listVideo: data, totalPage }, 'Thanh cong', 200)
    } catch (error) {
        response(res, '', 'Loi he thong!', 500)
    }
}

const getVideoDetail = async (req, res) => {
    try {
        let { videoId } = req.params;

        let data = await model.video.findByPk(videoId, {
            include: ["type", "user"]
        })

        response(res, data, 'Thanh cong', 200)
    } catch (error) {
        response(res, '', 'Loi he thong!', 500)
    }
}


export {
    getVideo,
    createVideo,
    updateVideo,
    getVideoType,
    getVideoWithType,
    getVideoPage, getVideoDetail
}