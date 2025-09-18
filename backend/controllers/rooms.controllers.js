import RoomDto from "../Dtos/room.dto.js";
import roomService from "../services/room.service.js";

class RoomsController{
    async create(req, res) {
        const { topic, roomType } = req.body;
        if (!topic || !roomType) {
            return res.status(400).json({ success: false, message: 'Please select all fields' });
        }

        try {
            const room = await roomService.create({
                topic,
                roomType,
                ownerId: req.user._id
            });
            return res.json(new RoomDto(room));
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    async index(req,res){
        const rooms = await roomService.getAllRooms(['open'])
        const allRooms = rooms.map(room=> new RoomDto(room))
        res.json(allRooms)

    }
}
export default new RoomsController();