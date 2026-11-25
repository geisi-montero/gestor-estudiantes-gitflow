const Update = {
    edit(id) {
        const est = App.getAll().find(e => e.id === id);
        if (!est) return;

        App.editingId = id;
        document.getElementById("nombre").value = est.nombre;
        document.getElementById("correo").value = est.correo;
        document.getElementById("carrera").value = est.carrera;
        document.getElementById("form-title").textContent = "Editar estudiante";
        document.getElementById("btn-guardar").textContent = "Actualizar";
        document.getElementById("btn-cancelar").hidden = false;
        App.showErrors([]);
        window.scrollTo({ top: 0, behavior: "smooth" });
    },

    save(data) {
        const list = App.getAll().map(e =>
            e.id === App.editingId ? { ...e, ...data } : e
        );
        App.saveAll(list);
        App.clearForm();
        Read.render();
        App.toast("Estudiante actualizado");
    }
};