import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import userService from '../services/user.service.js';
import useDto from '../Dtos/user.dto.js';

// Get the directory name using ESM syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ActivateController {
    async activate(req, res) {
        const { name, avatar } = req.body;
        if (!name || !avatar) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
        let user;

        try {
            const buffer = Buffer.from(
                avatar.replace(/^data:image\/\w+;base64,/, ''),
                'base64'
            );

            const filePath = path.join(__dirname, `../storage/${imagePath}`);
            fs.writeFileSync(filePath, buffer);

            user = await userService.findUser({ _id: req.user._id });
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`;
            await user.save();

            const userDto = new useDto(user);
            return res.json({ user: userDto, auth: true });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Could not process image or save user data' });
        }
    }
}

export default new ActivateController();