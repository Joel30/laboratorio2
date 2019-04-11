var express = require('express');
var router = express.Router();

router.get('./', function(req, res, next){
    res.status(200).json({
        msn:"Hola Mundo"
    });
});

router.post('/test', function(req,res,next){
    req.body["msn"] = "Por el servidor";
    var data= req.body
    res.status(200).json(data);
});

router.post('/divisas', function(req, res, next) {
    var cambio = req.body.cambio;
    var dollar = req.body.dollar;

    var moneda = {
        "Boliviano" : 0.14,
        "bitcoin" : 6605.13,
        "Peso chileno" : 0.0015,
        "Peso Argentino" : 0.025,
        "Euro" : 1.17
    };

    var total = 0;
    for (var key in moneda){
        if (key === cambio) {
            total = parseFloat((parseFloat(dollar) / moneda[key]).toFixed(2));
        }
    }
    res.status(200).json(total);
});

router.post('/interes', function(req, res, next) {

    /*  1.- monto que se solicita
        2.- tipo de inters anual
        3.- tiempo de pago

    /* INTERES COMPUESTO
        Cn = Co *(1+ i)^n

    Cn = capital final en el año "n"
    Co = capital inicial
    i = tipo de interes anual compuesto
    n = numero de años
    */
    var monto = req.body.monto;
    var tipo = req.body.tipo;
    var tiempo = req.body.tiempo;

    var interesCompuesto = parseFloat((parseFloat(monto) * Math.pow((1 + parseFloat(tipo)), parseFloat(tiempo))).toFixed(2));

    res.status(200).json(interesCompuesto);

});
module.exports = router;
