const Validate = {
    check(data, ignoreId = null) {
        const errors = [];

        if (data.nombre.length < 3) {
            errors.push("El nombre debe tener al menos 3 caracteres.");
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
            errors.push("Ingresa un correo válido.");
        }
        if (!data.carrera) {
            errors.push("Selecciona una carrera.");
        }
        const duplicado = App.getAll().some(
            e => e.correo === data.correo && e.id !== ignoreId
        );
        if (duplicado) {
            errors.push("Ya existe un estudiante con ese correo.");
        }

        return errors;
    }
};