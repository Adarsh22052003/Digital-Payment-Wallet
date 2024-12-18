const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("A user connected");
    
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

module.exports = { io };

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
