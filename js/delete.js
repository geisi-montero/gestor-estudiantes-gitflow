const Delete = {
    remove(id) {
        const est = App.getAll().find(e => e.id === id);
        if (!est) return;
        if (!confirm(`¿Eliminar a ${est.nombre}?`)) return;

        App.saveAll(App.getAll().filter(e => e.id !== id));
        if (App.editingId === id) App.clearForm();
        Read.render();
        App.toast("Estudiante eliminado");
    }
};