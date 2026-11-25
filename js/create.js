const Create = {
    add(data) {
        const list = App.getAll();
        list.push({ id: Date.now().toString(), ...data });
        App.saveAll(list);
        App.clearForm();
        Read.render();
        App.toast("Estudiante registrado correctamente");
    }
};