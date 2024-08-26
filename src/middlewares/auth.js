const jwt = require('jsonwebtoken');

module.exports = (rol) => (req, res, next) => {
  try {
    const token = req.header('auth');
    if(!token) return res.status(401).json({ message: 'No está autorizado'});
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verificar el token
    
    if(decoded.rol === rol) {
      req.body.idUsuario = decoded.id;
      next();
    }
    else {
      return res.status(403).json({
        message: 'No tienes permisos'
      });
    }
    

  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
}



/*
fetch('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'auth': 'Bearer ' + token
  }
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error:', error);
});
*/

/*
axios.post('url', {}, {
  headers: {
    'auth': 'Bearer ' + token
  }
})
*/