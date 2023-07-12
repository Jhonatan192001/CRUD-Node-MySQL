const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM personas', (err, personas) => {
            if (err) {
                res.json(err); 
            }
            // console.log(personas);
            res.render('personas', {
                data: personas
            })
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO personas set ?', [data], (err, personas) => {
            res.redirect('/')
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM personas WHERE id = ?', [id], (err, personas) => {
            res.render('personas_edit', {
                data: personas[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newPersona = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE personas set ? WHERE id = ?', [newPersona, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM personas WHERE id = ?', [id], (err, rows) => {
            res.redirect('/')
        });
    });
};

module.exports = controller;