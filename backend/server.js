require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
    try {
        const { skills, interest, level } = req.body;

        const prompt = `
User skills: ${skills}
Career interest: ${interest}
Experience level: ${level}

You are an expert AI career strategist helping developers plan their future.

Analyze the user's profile deeply and generate a highly personalized and practical roadmap.

Use this exact format only:

Career Path:
- Recommend the most suitable career direction.
- Explain WHY this path fits the user's current skills and interest.

Skill Gap Analysis:
- Identify what the user is currently missing.
- Highlight 3–5 key weaknesses or gaps clearly.

Skills to Learn:
- List prioritized skills (from most important to less urgent).
- Focus on high-impact skills relevant to the career path.

Project Ideas:
- Suggest 3 UNIQUE and portfolio-worthy projects (avoid generic ideas like simple todo apps).
- Each project must include:
  - What the project is
  - Why it is valuable
  - What skills it demonstrates

Next Steps:
- Provide a realistic 7–14 day action plan.
- Make it specific, actionable, and beginner-friendly.

Do not use markdown symbols such as ###, **, or ---.
Avoid generic advice.
Make the output feel like a smart AI mentor giving real, thoughtful guidance.
`;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = response.data;
        console.log("OpenRouter response:", data);

        res.json({
            result: data.choices[0].message.content
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});