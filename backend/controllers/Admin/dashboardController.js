const adminDashboardController = (req, res) => {
    res.json({
      message: "Bem-vindo ao painel de administração!",
      user: req.user,  // Retornar dados do usuário para verificar se é admin
    });
  };
  
  module.exports = adminDashboardController;
  