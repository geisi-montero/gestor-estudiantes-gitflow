const Read = {
    render() {
        const body = document.getElementById("tabla-body");
        const vacio = document.getElementById("vacio");
        const q = document.getElementById("buscar").value.trim().toLowerCase();

        const list = App.getAll().filter(e =>
            [e.nombre, e.correo, e.carrera].some(v => v.toLowerCase().includes(q))
        );

        vacio.hidden = list.length > 0;
        body.innerHTML = list.map(e => `
      <tr>
        <td>${App.escape(e.nombre)}</td>
        <td>${App.escape(e.correo)}</td>
        <td>${App.escape(e.carrera)}</td>
        <td>
          <button class="btn small" data-action="edit" data-id="${e.id}">Editar</button>
          <button class="btn small danger" data-action="delete" data-id="${e.id}">Eliminar</button>
        </td>
      </tr>`).join("");
    }
};