const App = {
  KEY: "estudiantes",
  editingId: null,

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch (e) { return []; }
  },

  saveAll(list) {
    localStorage.setItem(this.KEY, JSON.stringify(list));
  },

  readForm() {
    return {
      nombre: document.getElementById("nombre").value.trim(),
      correo: document.getElementById("correo").value.trim().toLowerCase(),
      carrera: document.getElementById("carrera").value
    };
  },

  showErrors(errors) {
    document.getElementById("errores").innerHTML =
      errors.map(e => `<li>${e}</li>`).join("");
  },

  clearForm() {
    document.getElementById("form-estudiante").reset();
    this.editingId = null;
    this.showErrors([]);
    document.getElementById("form-title").textContent = "Nuevo estudiante";
    document.getElementById("btn-guardar").textContent = "Guardar";
    document.getElementById("btn-cancelar").hidden = true;
  },

  toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200);
  },

  escape(text) {
    const d = document.createElement("div");
    d.textContent = text;
    return d.innerHTML;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-estudiante").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = App.readForm();
    const errors = Validate.check(data, App.editingId);
    if (errors.length) { App.showErrors(errors); return; }
    App.showErrors([]);
    if (App.editingId) Update.save(data);
    else Create.add(data);
  });

  document.getElementById("btn-cancelar").addEventListener("click", () => App.clearForm());
  document.getElementById("buscar").addEventListener("input", () => Read.render());

  document.getElementById("tabla-body").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    if (btn.dataset.action === "edit") Update.edit(btn.dataset.id);
    if (btn.dataset.action === "delete") Delete.remove(btn.dataset.id);
  });

  Read.render();
});
