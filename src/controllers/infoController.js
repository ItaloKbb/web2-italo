export const getApiInfo = (req, res) => {
    res.status(200).json({
      version: process.env.VERSION,
      name: "API destidada a CRUD de uma pequena intranet/rede social",
      description: "Essa API permite gerenciar Users, Posts e Comments ",
    });
  };
  
  export const getServerUptime = (req, res) => {
    const uptimeInSeconds = process.uptime();
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);
  
    res.status(200).json({
      uptime: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      message: "Server está funcionando normalmente",
    });
  };  