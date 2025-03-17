import * as aiService from '../services/ai.service.js';


export const result = async (req, res) => {
    try {
        const { prompt } = req.query;
        const result = await aiService.generateResult(prompt);
        res.send(result);
    } catch (error)
    {
        console.error("Error generating result:", error);
        res.status(500).send("Error generating result");
    }
}